import React, { useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "contexts/app.context";
import { getTimesheetData } from "services/timesheetAPI.service";

const LandingPage = () => {
  const navigate = useNavigate();
  const { setTimesheetData } = useContext(AppContext);

  useEffect(() => {
    const init = async () => {
      const { success, payload } = await getTimesheetData();
      console.log("successss", success);
      console.log("payloadddd", payload);
      if (success) {
        setTimesheetData(payload);
        navigate("/timesheet-page");
      } else {
        navigate("/clockin-page");
      }
    };
    init();
  }, []);
};

export default LandingPage;
