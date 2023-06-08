import React from "react";
import { Button, Divider, notification, Space } from "antd";
import PropTypes from "prop-types";

const propTypes = {
  type: "success" || "error" || "info" || "warning",
  message: PropTypes.string,
};
const defaultProps = {
  type: "success",
};

const AlertMessage = ({ type, description, text }) => {
  const [api] = notification.useNotification();
  const openNotification = () => {
    api.info({
      message: `Notification ${text}`,
      description: {description},
      text,
    });
  };
  return (
    <Button type="primary" onClick={() => openNotification("bottomRight")}>
      <RadiusBottomrightOutlined />
      bottomRight
    </Button>
  );
};

AlertMessage.propTypes = propTypes;
AlertMessage.defaultProps = defaultProps;

export default App;
