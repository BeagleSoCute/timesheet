import { notification } from "antd";

export const displayNotification = ({
  type = "success",
  description = "Action Success",
  header = "Success",
}) => {
  const displayResult = {
    message: header,
    description: description,
    duration: 4
  };
  return type === "error"
    ? notification.error(displayResult)
    : notification.success(displayResult);
};
