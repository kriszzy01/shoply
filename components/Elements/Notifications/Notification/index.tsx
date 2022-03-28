import SVG from "react-inlinesvg";
import * as React from "react";

import style from "./style.module.scss";

import { Notification as NotificationType } from "@/types";

const icons = {
  error: "/assets/error.svg",
  warning: "/assets/warning.svg",
  info: "/assets/info.svg",
  success: "/assets/success.svg",
};

export interface NotificationProps extends NotificationType {
  handleClose: () => void;
}

export const Notification = ({
  variant = "warning",
  title,
  message,
  handleClose,
}: NotificationProps) => {
  React.useEffect(() => {
    let timeout = setTimeout(handleClose, 4000); //Close the notification after 2 seconds

    return () => {
      clearTimeout(timeout);
    };
  }, [handleClose]);

  return (
    <div className={style["notification"]} role="alert">
      <div className={style[`notification__icon-${variant}`]}>
        <SVG src={icons[variant]} width="24" height="24" />
      </div>
      <div className={style["notification__content"]}>
        <p>{title}</p>
        <p>{message}</p>
      </div>
      <div className={style["notification__control"]}>
        <button
          type="button"
          aria-label="close notification"
          onClick={handleClose}
        >
          <SVG src={"/assets/close.svg"} width="20" height="20" />
        </button>
      </div>
    </div>
  );
};
