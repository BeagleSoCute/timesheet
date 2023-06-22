import React, { useContext, useState, useEffect } from "react";
import { AppContext } from "contexts/app.context";
import SignInForm from "smart/SigninPage/components/SignInForm";
import { useNavigate } from "react-router-dom";
import { mergeDateAndTime } from "helpers/dateTime.helper";
import { signinFormProps } from "interface";
import { signin } from "services/timesheetAPI.service";
import { notification } from "helpers/notification.helper";
import { handleRetriveLocationData } from "helpers/location.helper";
const SigninPage = () => {
  const navigate = useNavigate();
  const { setClockIn, setLoading } = useContext(AppContext);

  useEffect(() => {
    //popup perrmission
    navigator.geolocation.getCurrentPosition(() => {});
  }, []);

  const handleSubmit = async (value: signinFormProps) => {
    const { isSuccessRetrivedLocation, latitude, longitude } =
      await handleRetriveLocationData();
    if (!isSuccessRetrivedLocation) {
      notification({
        type: "error",
        message:
          "Can not singin into the system, Please allow the permission to access the location on your browser setting!",
      });
      return;
    }
    setLoading(true);

    const transformData = {
      isForgetSignin: value.isForgetSignin,
      signinTime: value.signinTime,
      startDateTime: mergeDateAndTime(value.startDate, value.startTime),
      latitude,
      longitude,
    };
    const { success, payload } = await signin(transformData);
    if (!success) {
      notification({
        type: "error",
        message: "Can not signin to the system, Please contact the admin",
      });
      setLoading(false);
      return;
    }
    const saveData = {
      startDateTime: mergeDateAndTime(value.startDate, value.startTime),
      signinData: payload,
    };
    console.log("saveData-----------", saveData);
    await setClockIn(saveData);
    notification({ type: "success", message: "Sign in Success!" });
    setLoading(false);
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
