import React, { useContext } from "react";
import { AppContext } from "contexts/app.context";
import SignInForm from "components/form/SignInForm";
import { notification } from "helpers/notification.helper";
import { useNavigate } from "react-router-dom";

const SigninPage = () => {
  const navigate = useNavigate();
  const { setAuth } = useContext(AppContext);
  const handleSubmit = (value) => {
    setAuth(value);
    notification({ type: "success", message: "Sign in Success!" });
    navigate("timesheet-page");
  };
  const propsSignInForm = {
    onFinish: handleSubmit,
  };
  return (
    <div
      className="signinPage
    "
    >
      <SignInForm {...propsSignInForm} />
    </div>
  );
};

export default SigninPage;
