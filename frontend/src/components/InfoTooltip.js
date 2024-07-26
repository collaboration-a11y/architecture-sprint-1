import React from "react";
import SuccessIcon from "../images/success-icon.svg";
import ErrorIcon from "../images/error-icon.svg";

const contentByStatus = {
  success: {
    icon: SuccessIcon,
    text: "Вы успешно зарегистрировались",
  },
  fail: {
    icon: ErrorIcon,
    text: "Что-то пошло не так! Попробуйте ещё раз.",
  },
};

function InfoTooltip({ isOpen, onClose, status }) {
  const { icon, text } = contentByStatus[status];
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
            <img className="popup__icon" src={icon} alt="" />
            <p className="popup__status-message">{text}</p>
          </div>
        </form>
      </div>
    </div>
  );
}

export default InfoTooltip;
