import React, { useContext } from "react";
import { AppContext } from "contexts/app.context";
import SignoutForm from "smart/SignoutPage/components/SignoutForm";
import { notification } from "helpers/notification.helper";
import { useNavigate } from "react-router-dom";

const SignoutPage = () => {
  const navigate = useNavigate();

  const { timesheetData, setTimesheetData } = useContext(AppContext);

  const handleSubmit = (value) => {
    const transformValue = {
      ...value,
    };
    setTimesheetData(transformValue);
    notification({ type: "success", message: "Sign out Success!" });
    navigate("/timesheet-page");
  };
  const propsSignInForm = {
    pin: timesheetData.pin,
    startDateTime: timesheetData.startTime,
    job: timesheetData.job,
    onFinish: handleSubmit,
  };
  return (
    <div className="signoutPage">
      <SignoutForm {...propsSignInForm} />
    </div>
  );
};

export default SignoutPage;
