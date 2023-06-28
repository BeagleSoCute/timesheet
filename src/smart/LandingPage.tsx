import React, { useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "contexts/app.context";
import { getTimesheetData } from "services/timesheetAPI.service";
import { removeLocalStorage } from "../helpers/localstorage.helper";

const LandingPage = () => {
  const navigate = useNavigate();
  const { setTimesheetData, logout } = useContext(AppContext);

  useEffect(() => {
    const init = async () => {
      const { success, payload } = await getTimesheetData();
      console.log("successss", success);
      console.log("payloadddd", payload);

      if (success) {
        setTimesheetData(payload);
        navigate("/timesheet-page");
      } else if (!success && payload !== undefined) {
        navigate("/clockin-page");
      } else {
        removeLocalStorage();
        logout();
        navigate("/");
      }
    };
    init();
  }, []);
};

export default LandingPage;
