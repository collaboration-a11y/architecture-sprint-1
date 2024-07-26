import React from "react";
import SuccessIcon from "../../images/success-icon.svg";
import ErrorIcon from "../../images/error-icon.svg";

import "../../styles/popup/popup.css";

const contentByStatus = {
  success: {
    icon: SuccessIcon,
    text: "Вы успешно зарегистрировались",
  },
  fail: {
    text: "Что-то пошло не так! Попробуйте ещё раз.",
    icon: ErrorIcon,
  },
};

function InfoTooltip({ isOpen, onClose, status }) {
  const { icon: Icon, text } = contentByStatus[status];
  return (
    <div className={`popup ${isOpen && "popup_is-opened"}`}>
      <div className="popup__content">
        <form className="popup__form" noValidate>
          <button
            type="button"
            className="popup__close"
            onClick={onClose}
          ></button>
          <div>
            <Icon className="popup__icon" />
            <p className="popup__status-message">{text}</p>
          </div>
        </form>
      </div>
    </div>
  );
}

export default InfoTooltip;
