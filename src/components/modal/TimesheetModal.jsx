import React from "react";
import PropTypes from "prop-types";
import { Button, Modal } from "antd";

const propTypes = {
  isOpenModal: PropTypes.bool,
  onClose: PropTypes.func,
  onOk: PropTypes.func,
};
const defaultProps = {
  isOpenModal: false,
  onClose: () => {},
  onOk: () => {},
};

const TimesheetModal = ({ isOpenModal, onOk, onClose }) => {
  return (
    <div className="timesheet-modal">
      <Modal
        title="Timesheet Allocation"
        centered
        open={isOpenModal}
        onOk={() => onOk()}
        onCancel={() => onClose()}
        width={1000}
      >
        <p>some contents...</p>
        <p>some contents...</p>
        <p>some contents...</p>
      </Modal>
    </div>
  );
};

TimesheetModal.propTypes = propTypes;
TimesheetModal.defaultProps = defaultProps;

export default TimesheetModal;
