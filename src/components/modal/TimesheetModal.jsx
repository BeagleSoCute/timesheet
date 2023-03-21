import React from "react";
import PropTypes from "prop-types";
import { Modal, Form, Button } from "antd";
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
  handleSubmitModal,
  onClose,
}) => {
  const [form] = Form.useForm();
  const handleClose = () => {
    form.resetFields();
    onClose();
  };
  const handleOnOk = () => {
    handleSubmitModal();
  };

  const propsModal = {
    title: "Timesheet Allocation",
    open: isOpenModal,
    // onOk: () => handleOnOk(),
    footer: [
      <Button key="cancel" onClick={handleClose}>
        Cancel
      </Button>,
      <Button
        key="submit"
        type="primary"
        htmlType="submit"
        form="timesheet-allo"
      >
        Submit
      </Button>,
    ],
    onCancel: () => handleClose(),
    width: 1000,
  };
  const propsTimeSheetAllocationForm = {
    form,
    remainingHours,
    handleSetRemaingHour,
    handleOnOk,
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
