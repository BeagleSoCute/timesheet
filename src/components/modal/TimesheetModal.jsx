import React from "react";
import PropTypes from "prop-types";
import { Modal, Form } from "antd";
import TimesheetAllocationForm from "components/form/TimesheetAllocationForm";
const propTypes = {
  isOpenModal: PropTypes.bool,
  onClose: PropTypes.func,
  onOk: PropTypes.func,
  handleSetRemaingHour: PropTypes.func,
};
const defaultProps = {
  isOpenModal: false,
  onClose: () => {},
  onOk: () => {},
  handleSetRemaingHour: () => {},
};

const TimesheetModal = ({
  isOpenModal,
  remainingHours,
  handleSetRemaingHour,
  onOk,
  onClose,
}) => {
  const [form] = Form.useForm();
  const handleClose = () => {
    form.resetFields();
    onClose();
  };

  const propsModal = {
    title: "Timesheet Allocation",
    open: isOpenModal,
    onOk: () => onOk(),
    onCancel: () => handleClose(),
    width: 1000,
  };
  const propsTimeSheetAllocationForm = {
    form,
    remainingHours,
    handleSetRemaingHour,
  };
  return (
    <div className="timesheet-modal">
      <Modal centered {...propsModal}>
        <TimesheetAllocationForm {...propsTimeSheetAllocationForm} />
      </Modal>
    </div>
  );
};
TimesheetModal.propTypes = propTypes;
TimesheetModal.defaultProps = defaultProps;

export default TimesheetModal;
