import React, { useState } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";

import PopupWithForm from "lib-app/PopupWithForm";
import InfoTooltip from "lib-app/InfoTooltip";
import Header from "header/Header";
import Login from "auth/Login";
import Register from "auth/Register";
import Footer from "footer/Footer";

import { useApplication } from "main-app/store";

import Main from "./components/Main/index.jsx";
import ProtectedRoute from "./lib/routes/ProtectedRoute.jsx";

import * as auth from "./lib/api/auth";

import "lib-app/page-styles";

const App = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const [isInfoToolTipOpen, setIsInfoToolTipOpen] = React.useState(false);
  const [tooltipStatus, setTooltipStatus] = React.useState("");

  const { setCurrentUser, api } = useApplication();

  function onRegister({ email, password }) {
    auth
      .register(email, password)
      .then((res) => {
        console.log("asdsa");
        setTooltipStatus("success");
        setIsInfoToolTipOpen(true);
        navigate("/signin");
      })
      .catch((err) => {
        setTooltipStatus("fail");
        setIsInfoToolTipOpen(true);
      });
  }

  function onLogin({ email, password }) {
    auth
      .login(email, password)
      .then((res) => {
        setIsLoggedIn(true);
        setEmail(email);
        navigate("/");
      })
      .catch((err) => {
        setTooltipStatus("fail");
        setIsInfoToolTipOpen(true);
      });
  }

  function onSignOut() {
    // при вызове обработчика onSignOut происходит удаление jwt
    localStorage.removeItem("jwt");
    setIsLoggedIn(false);
    // После успешного вызова обработчика onSignOut происходит редирект на /signin
    navigate("/signin");
  }

  // Запрос к API за информацией о пользователе и массиве карточек выполняется единожды, при монтировании.
  React.useEffect(() => {
    api
      .getUserInfo()
      .then((userData) => {
        setCurrentUser(userData);
      })
      .catch((err) => console.log(err));
  }, []);

  // при монтировании App описан эффект, проверяющий наличие токена и его валидности
  React.useEffect(() => {
    const token = localStorage.getItem("jwt");
    if (token) {
      auth
        .checkToken(token)
        .then((res) => {
          setEmail(res.data.email);
          setIsLoggedIn(true);
          navigate("/");
        })
        .catch((err) => {
          localStorage.removeItem("jwt");
          console.log(err);
        });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="page__content">
      <Header email={email} onSignOut={onSignOut} />

      <Routes>
        <Route element={<ProtectedRoute loggedIn={isLoggedIn} />}>
          <Route path="/" element={<Main />} />
        </Route>
        <Route path="/signin" element={<Login onLogin={onLogin} />} />
        <Route path="/signup" element={<Register onRegister={onRegister} />} />
      </Routes>
      <Footer />
      <PopupWithForm title="Вы уверены?" name="remove-card" buttonText="Да" />
      <InfoTooltip
        isOpen={isInfoToolTipOpen}
        onClose={() => {
          setIsInfoToolTipOpen(false);
        }}
        status={tooltipStatus}
      />
    </div>
  );
};

export default App;
