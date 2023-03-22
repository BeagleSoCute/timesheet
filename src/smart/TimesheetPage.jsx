import React, { useContext, useState } from "react";
import { AppContext } from "contexts/app.context";
import TimesheetForm from "components/form/TimesheetForm";
import TimesheetModal from "components/modal/TimesheetModal";
import {
  calculateRemainHours,
  trasformSubmitAllocatedHours,
} from "services/timesheet.service";
import { notification } from "helpers/notification.helper";
import { Modal } from "antd";
import TableData from "components/common/TableData";

const tableColums = [
  {
    title: "Job",
    dataIndex: "job",
    key: "job",
  },
  {
    title: "CC",
    dataIndex: "supervisors",
    key: "supervisors",
  },
  {
    title: "Op/Lab",
    dataIndex: "lab",
    key: "lab",
  },
  {
    title: "Asset",
    dataIndex: "asset",
    key: "asset",
  },
  {
    title: "Hours",
    dataIndex: "labourHours",
    key: "labourHours",
  },
];

const TimesheetPage = () => {
  const [isOpenModal, setOpenModal] = useState(false);
  const { timesheetData, allocatedData, setAllocatedHours } =
    useContext(AppContext);
  const [remainingHours, setRemainingHour] = useState("");
  const [loadingModal, setLoadingModal] = useState(false);

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

  const handleSubmitModal = async (value) => {
    console.log("handleSubmitModal", value);
    if (remainingHours !== "00:00") {
      notification({
        type: "error",
        message:
          "You still have Remaning Hours, Please allocate all of your work",
      });
      return false;
    }
    setLoadingModal(true);
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const success = true; //handler error when get error from the backend
        if (success) {
          Modal.success({
            content: (
              <p className="text-xl">Timesheet Allocstion is completed</p>
            ),
            centered: true,
            closable: true,
            maskClosable: true,
            okButtonProps: { style: { display: "none" } },
            onCancel: () => handlecloseModal(),
          });
          setLoadingModal(false);
          setAllocatedHours(value);
          setRemainingHour("");
          resolve(true);
        } else {
          notification({
            type: "error",
            message:
              "Fails to complete Timesheet Allocation, Please try again later! ",
          });
          setLoadingModal(false);
          reject(false);
        }
      }, 3000);
    });
  };

  const handleSetRemaingHour = (value) => {
    setRemainingHour(value);
  };

  const propsModal = {
    isOpenModal,
    remainingHours,
    loading: loadingModal,
    handleSetRemaingHour,
    handleSubmitModal,
    onClose: handlecloseModal,
  };
  const propsTimesheetForm = {
    data: timesheetData,
    onOpenModal: handleOpenModal,
  };
  const propsTableData = {
    columns: tableColums,
    data: trasformSubmitAllocatedHours(allocatedData),
  };
  return (
    <div className="timesheet-page">
      <TimesheetForm {...propsTimesheetForm} />
      <div className="mt-20 font-bold">
        <p>Allocated hours</p>
        <TableData {...propsTableData} />
      </div>
      <TimesheetModal {...propsModal} />
    </div>
  );
};
export default TimesheetPage;
