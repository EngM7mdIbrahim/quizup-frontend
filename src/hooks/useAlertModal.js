import { useState } from "react";

export default () => {
  const [alertProps, setAlertProps] = useState({
    message: "",
    onConfirm: () => {},
    onCancel: () => {},
  });

  let showAlert = (message, onConfirm) => {
    setAlertProps({
      onCancel: () => setAlertProps({ ...alertProps, message: "" }),
      message,
      onConfirm: () => {
        setAlertProps({ ...alertProps, message: "" });
        onConfirm();
      },
    });
  };

  return [alertProps, showAlert];
};
