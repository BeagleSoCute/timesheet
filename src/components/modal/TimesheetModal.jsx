import React from "react";
import PropTypes from "prop-types";
import { Modal, Form, Button, Spin } from "antd";
import TimesheetAllocationForm from "components/form/TimesheetAllocationForm";
const propTypes = {
  isOpenModal: PropTypes.bool,
  loading: PropTypes.bool,
  onClose: PropTypes.func,
  onOk: PropTypes.func,
  handleSetRemaingHour: PropTypes.func,
};
const defaultProps = {
  isOpenModal: false,
  loading: false,
  onClose: () => {},
  onOk: () => {},
  handleSetRemaingHour: () => {},
};

const TimesheetModal = ({
  isOpenModal,
  remainingHours,
  loading,
  handleSetRemaingHour,
  handleSubmitModal,
  onClose,
}) => {
  const [form] = Form.useForm();
  const handleClose = () => {
    // form.resetFields();
    form.setFieldsValue({
      items: [{}],
    });
    onClose();
  };
  const handleOnOk = async (value) => {
    const isSuccess = await handleSubmitModal(value);
    console.log("isSuccess", isSuccess);
    if (isSuccess) {
      form.setFieldsValue({
        items: [{}],
      });
    }
  };
  const propsModal = {
    title: "Timesheet Allocation",
    open: isOpenModal,
    footer: [
      <Button disabled={loading} key="cancel" onClick={handleClose}>
        Cancel
      </Button>,
      <Button
        disabled={loading}
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
        <Spin size="large" spinning={loading}>
          <TimesheetAllocationForm {...propsTimeSheetAllocationForm} />
        </Spin>
      </Modal>
    </div>
  );
};
TimesheetModal.propTypes = propTypes;
TimesheetModal.defaultProps = defaultProps;

export default TimesheetModal;
