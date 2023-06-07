import React, { useContext } from "react";
import { AppContext } from "contexts/app.context";
import SignoutForm from "smart/SignoutPage/components/SignoutForm";
import { notification } from "helpers/notification.helper";
import { useNavigate } from "react-router-dom";

const SignoutPage = () => {
  const navigate = useNavigate();
  const { signinData, setTimesheetData } = useContext(AppContext);
  const handleSubmit = (value: any) => {
    const transformData = {
      pin: value.pin,
      startDateTime: value.startDateTime,
      job: value.job,
      finishTime: value.finishTime,
      finishDate: value.finishDate,
    };
    setTimesheetData(transformData);
    notification({ type: "success", message: "Sign out Success!" });
    navigate("/timesheet-page");
  };
  const propsSignOutForm = {
    pin: signinData.pin,
    startDateTime: signinData.startDateTime,
    job: signinData.job,
    onFinish: handleSubmit,
  };
  return (
    <div className="signoutPage">
      <SignoutForm {...propsSignOutForm} />
    </div>
  );
};

export default SignoutPage;
