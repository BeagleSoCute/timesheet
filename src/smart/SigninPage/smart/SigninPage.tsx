import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "contexts/app.context";
import SignInForm from "smart/SigninPage/components/SignInForm";
import { notification } from "helpers/notification.helper";
import { useNavigate } from "react-router-dom";
import { mergeDateAndTime } from "helpers/dateTime.helper";
import { signinFormProps } from "interface";
import { getJobLists } from "services/api.services";
import { jobListsAPiReturnType } from "interface/index";

const SigninPage = () => {
  const [jobs, setJobs] = useState<any>();
  const [loading, setLoading] = useState<boolean>(true);
  const navigate = useNavigate();
  const { clockIn, setJobLists } = useContext(AppContext);
  useEffect(() => {
    const init = async () => {
      const { success, payload }: jobListsAPiReturnType = await getJobLists();
      setJobLists(payload);
      setJobs(payload);
    };
    // init();
    setLoading(false);
  }, []);
  const handleSubmit = (value: signinFormProps) => {
    const transformData = {
      pin: value.pin,
      startDateTime: mergeDateAndTime(value.startDate, value.startTime),
      job: value.job,
    };
    clockIn(transformData);
    notification({ type: "success", message: "Sign in Success!" });
    navigate("signout");
  };
  const propsSignInForm = {
    jobLists: jobs,
    onFinish: handleSubmit,
  };
  return (
    <div className="signinPage">
      {!loading && <SignInForm {...propsSignInForm} />}
    </div>
  );
};
export default SigninPage;
