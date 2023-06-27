import React, { useContext, useEffect } from "react";
import { AppContext } from "contexts/app.context";
import SignoutForm from "smart/SignoutPage/components/SignoutForm";
import { notification } from "helpers/notification.helper";
import { useNavigate } from "react-router-dom";
import { signoutFormProps } from "interface";
import { signout, getTimesheetData } from "services/timesheetAPI.service";

const SignoutPage = () => {
  const navigate = useNavigate();
  const { clockinData, actionAPIData, setLoading, setTimesheetData } =
    useContext(AppContext);

  useEffect(() => {
    const init = async () => {
      await getTimesheetData();
    };
    init();
  }, []);

  const handleSubmit = async (value: signoutFormProps) => {
    const sigoutData = {
      finishTime: value.finishTime,
      isForgetSingout: value.isForgetSingout,
      signinData: actionAPIData,
    };
    const transformData = {
      startDateTime: value.startDateTime,
      finishTime: value.finishTime,
      finishDate: value.finishDate,
    };
    setLoading(true);
    const { success } = await signout(sigoutData);
    if (!success) {
      notification({
        type: "error",
        message: "Can not signout from the system, Please contact the admin",
      });
      setLoading(false);
      return;
    }

    setTimesheetData(transformData);
    notification({ type: "success", message: "Sign out Success!" });
    navigate("/timesheet-page");
  };
  const propsSignOutForm = {
    startDateTime: clockinData,
    onFinish: handleSubmit,
  };
  return (
    <div className="signoutPage">
      <SignoutForm {...propsSignOutForm} />
    </div>
  );
};

export default SignoutPage;
