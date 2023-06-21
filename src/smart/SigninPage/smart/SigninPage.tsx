import React, { useContext, useState } from "react";
import { AppContext } from "contexts/app.context";
import SignInForm from "smart/SigninPage/components/SignInForm";
import { useNavigate } from "react-router-dom";
import { mergeDateAndTime } from "helpers/dateTime.helper";
import { signinFormProps } from "interface";
import { signin } from "services/timesheetAPI.service";
const SigninPage = () => {
  const [jobs, setJobs] = useState<any>();
  const navigate = useNavigate();
  const { clockIn } = useContext(AppContext);
  // useEffect(() => {
  //   setLoading(true);
  //   const init = async () => {
  //     const { success, payload }: jobListsAPiReturnType = await getJobLists();
  //     setJobLists(payload);
  //     setJobs(payload);
  //   };
  //   init();
  //   setLoading(false);
  // }, []);
  const handleSubmit = async (value: signinFormProps) => {
    const { success, payload } = await signin();

    const transformData = {
      ...value,
      startDateTime: mergeDateAndTime(value.startDate, value.startTime),
    };
    // clockIn(transformData);
    // notification({ type: "success", message: "Sign in Success!" });
    // navigate("/signout");
  };
  const propsSignInForm = {
    jobLists: jobs,
    onFinish: handleSubmit,
  };
  return (
    <div className="signinPage">
      <SignInForm {...propsSignInForm} />
    </div>
  );
};
export default SigninPage;
