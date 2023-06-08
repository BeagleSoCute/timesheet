import React, { useContext } from "react";
import { AppContext } from "contexts/app.context";
import SignInForm from "smart/SigninPage/components/SignInForm";
import { notification } from "helpers/notification.helper";
import { useNavigate } from "react-router-dom";
import { mergeDateAndTime } from "helpers/dateTime.helper";
import { handleSubmitSigninValueProps } from "interface";

const SigninPage = () => {
  const navigate = useNavigate();
  const { setAuth } = useContext(AppContext);
  const handleSubmit = (value: handleSubmitSigninValueProps) => {
    const transformData = {
      pin: value.pin,
      startDateTime: mergeDateAndTime(value.startDate, value.startTime),
      job: value.job,
    };
    setAuth(transformData);
    notification({ type: "success", message: "Sign in Success!" });
    navigate("signout");
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
