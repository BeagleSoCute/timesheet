import React from "react";
import PropTypes from "prop-types";
import { Modal } from "antd";
import TimesheetAllocation from "components/form/TimesheetAllocationForm";
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

const TimesheetModal = ({ isOpenModal, remainingHours, onOk, onClose }) => {
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
        <TimesheetAllocation remainingHours={remainingHours} />
      </Modal>
    </div>
  );
};
TimesheetModal.propTypes = propTypes;
TimesheetModal.defaultProps = defaultProps;

export default TimesheetModal;
