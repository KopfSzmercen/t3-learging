import { notifications } from "@mantine/notifications";
import { BiError } from "react-icons/bi";

const errorNotification = (message?: string) => {
  notifications.show({
    title: "Error!",
    message: message ?? "Error!",
    color: "red",
    icon: <BiError />,
    withCloseButton: true,
  });
};

export default errorNotification;
