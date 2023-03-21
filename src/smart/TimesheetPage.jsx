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
    setRemainingHour(res);
    setOpenModal(true);
  };

  const handlecloseModal = () => {
    setOpenModal(false);
    setRemainingHour("");
    //remove states in context
  };

  const handleSubmitModal = (value) => {
    console.log("handleSubmitModal");
  };

  const handleSetRemaingHour = (value) => {
    setRemainingHour(value);
  };

  const propsModal = {
    isOpenModal,
    remainingHours,
    handleSetRemaingHour,
    handleSubmitModal,
    onClose: handlecloseModal,
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
