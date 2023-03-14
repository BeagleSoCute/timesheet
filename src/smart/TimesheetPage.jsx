import React, { useContext, useState } from "react";
import { AppContext } from "contexts/app.context";
import TimesheetForm from "components/form/TimesheetForm";
import TimesheetModal from "components/modal/TimesheetModal";

const TimesheetPage = () => {
  const [isOpenModal, setOpenModal] = useState(false);
  const { timesheetData } = useContext(AppContext);

  const handleOpenModal = () => {
    setOpenModal(true);
    //set states in context
  };

  const handlecloseModal = () => {
    setOpenModal(false);
    //remove states in context
  };

  const handleSubmit = () => {};

  const propsModal = {
    isOpenModal,
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
