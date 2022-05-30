import { notification } from "antd";

const openNotification = ({ text, type = "info", title }) => {
  notification[type]({
    message: title,
    description: text,
  });
};

export default openNotification;
