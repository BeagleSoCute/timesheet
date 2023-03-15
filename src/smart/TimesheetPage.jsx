import React, { useContext, useState } from "react";
import { AppContext } from "contexts/app.context";
import TimesheetForm from "components/form/TimesheetForm";
import TimesheetModal from "components/modal/TimesheetModal";
import { calculateRemainHours } from "services/timesheet.service";

const TimesheetPage = () => {
  const [isOpenModal, setOpenModal] = useState(false);
  const { timesheetData } = useContext(AppContext);
  const [remainingHours, setRemainingHour] = useState("");

  const handleOpenModal = async (value) => {
    const res = await calculateRemainHours(value);
    console.log("res-----", res);
    setRemainingHour(res);
    setOpenModal(true);
  };

  const handlecloseModal = () => {
    setOpenModal(false);
    //remove states in context
  };

  const handleSubmit = () => {};

  const propsModal = {
    isOpenModal,
    remainingHours,
    onClose: handlecloseModal,
    onOk: handleSubmit,
  };
  const propsTimesheetForm = {
    data: timesheetData,
    onOpenModal: handleOpenModal,
  };
  return (
    <div className="timesheet-page">
      <TimesheetForm {...propsTimesheetForm} />
      <TimesheetModal {...propsModal} />
    </div>
  );
};
export default TimesheetPage;
