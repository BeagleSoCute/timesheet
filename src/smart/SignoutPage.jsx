import React, {useContext} from 'react'
import { AppContext } from "contexts/app.context";
import SignoutForm from "components/form/SignoutForm";
import { notification } from "helpers/notification.helper";
import { useNavigate } from "react-router-dom";

const SignoutPage = () => {
  const navigate = useNavigate();

  const { timesheetData, setTimesheetData } =
  useContext(AppContext);

  const handleSubmit = (value) => {
    console.log('value',value)
    const transformValue = {
      ...value,
    };
    setTimesheetData(transformValue);
    notification({ type: "success", message: "Sign out Success!" });
    navigate("/timesheet-page");
  };
  const propsSignInForm = {
    pin: timesheetData.pin,
    startDateTime: timesheetData.startDateTime,
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