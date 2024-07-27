import React from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import logoPath from "../../images/logo.svg";

import HeaderWrapper from "./HeaderWrapper.jsx";
import SignInLink from "./SignInLink.jsx";
import SignOutLink from "./SignOutLink.jsx";

import { useApplication } from "main-app/store";

import "../../styles/header/header.css";

// В корневом компоненте App описаны обработчики: onRegister, onLogin и onSignOut. Эти обработчики переданы в соответствующие компоненты: Register.js, Login.js, Header.js
function Header() {
  const navigate = useNavigate();
  const { setIsLoggedIn, email } = useApplication();

  function onSignOut() {
    // при вызове обработчика onSignOut происходит удаление jwt
    localStorage.removeItem("jwt");
    setIsLoggedIn(false);
    // После успешного вызова обработчика onSignOut происходит редирект на /signin
    navigate("/signin");
  }

  return (
    <header className="header page__section">
      <img
        src={logoPath}
        alt="Логотип проекта Mesto"
        className="logo header__logo"
      />
      <Routes>
        <Route
          exact
          path="/"
          element={<HeaderWrapper email={email} onSignOut={onSignOut} />}
        />
        <Route path="/signup" element={<SignOutLink />} />
        <Route path="/signin" element={<SignInLink />} />
      </Routes>
    </header>
  );
}

export default Header;
