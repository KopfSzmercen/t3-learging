import { notifications } from "@mantine/notifications";
import { MdCelebration } from "react-icons/md";

const successNotification = (message?: string) => {
  notifications.show({
    title: "Success!",
    message: message ?? "Success!",
    color: "green",
    icon: <MdCelebration />,
    withCloseButton: true,
  });
};

export default successNotification;
