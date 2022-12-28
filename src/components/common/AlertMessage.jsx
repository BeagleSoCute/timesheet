import React from "react";
import { Alert } from "antd";
import PropTypes from 'prop-types'

const propTypes = {
  type: "success" || "error" || "info" || "warning",
  message: PropTypes.string,
};
const defaultProps = {
  type: "success",
};

const AlertMessage = ({ type }) => <Alert message={message} type={type} />;

AlertMessage.propTypes = propTypes;
AlertMessage.defaultProps = defaultProps;

export default App;
