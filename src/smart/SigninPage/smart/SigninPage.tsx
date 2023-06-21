import React, { useContext, useState, useEffect } from "react";
import { AppContext } from "contexts/app.context";
import SignInForm from "smart/SigninPage/components/SignInForm";
import { useNavigate } from "react-router-dom";
import { mergeDateAndTime } from "helpers/dateTime.helper";
import { signinFormProps } from "interface";
import { signin } from "services/timesheetAPI.service";
import { notification } from "helpers/notification.helper";
const SigninPage = () => {
  const navigate = useNavigate();
  const { clockIn } = useContext(AppContext);

  useEffect(() => {
    //popup perrmission
    navigator.geolocation.getCurrentPosition(() => {});
  }, []);

  interface handleRetriveLocationDataReturnType {
    latitude: number;
    longitude: number;
    isSuccessRetrivedLocation: boolean;
  }
  const handleRetriveLocationData =
    async (): Promise<handleRetriveLocationDataReturnType> => {
      return new Promise<handleRetriveLocationDataReturnType>((resolve) => {
        let result = {
          isSuccessRetrivedLocation: false,
          latitude: 0,
          longitude: 0,
        };
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const res: any = position.coords;
            console.log("ressss", res);
            result = {
              isSuccessRetrivedLocation: true,
              latitude: res.latitude,
              longitude: res.longitude,
            };
            console.log("return final result", result);
            resolve(result); // Resolve the promise with the result
          },
          (error) => {
            console.log("error", error);
            console.log("return final result", result);
            resolve(result); // Resolve the promise with the result
          }
        );
      });
    };

  const handleSubmit = async (value: signinFormProps) => {
    const { isSuccessRetrivedLocation, latitude, longitude } =
      await handleRetriveLocationData();
    console.log("isSuccessRetrivedLocation", isSuccessRetrivedLocation);
    if (!isSuccessRetrivedLocation) {
      notification({
        type: "error",
        message:
          "Can not singin into the system, Please allow the permission to access the location on your browser setting!",
      });
      return;
    }
    const transformData = {
      isForgetSignin: value.isForgetSignin,
      signinTime: value.signinTime,
      startDateTime: mergeDateAndTime(value.startDate, value.startTime),
      latitude,
      longitude,
    };
    const { success } = await signin(transformData);
    if (!success) {
      notification({
        type: "error",
        message: "Can not signin to the system, Please contact the admin",
      });
    }
    clockIn(transformData);
    notification({ type: "success", message: "Sign in Success!" });
    navigate("/signout");
  };
  const propsSignInForm = {
    onFinish: handleSubmit,
  };
  return (
    <div className="signinPage">
      <SignInForm {...propsSignInForm} />
    </div>
  );
};
export default SigninPage;
