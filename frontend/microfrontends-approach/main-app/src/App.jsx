import React, { useState } from "react";

import { Route, Routes, useNavigate } from "react-router-dom";

import ProtectedRoute from "./lib/routes/ProtectedRoute.jsx";

import Footer from "footer/Footer";

import Register from "auth/Register";
import Login from "auth/Login";

import Header from "header/Header";

import PopupWithForm from "lib-app/PopupWithForm";

import Main from "./components/Main/index.jsx";

import * as auth from "./lib/api/auth";

import "./styles/page/page.css";
import { useApplication } from "main-app/store";

const App = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const { setCurrentUser, api } = useApplication();

  function onRegister({ email, password }) {
    auth
      .register(email, password)
      .then((res) => {
        // setTooltipStatus("success");
        // setIsInfoToolTipOpen(true);
        // history.push("/signin");
      })
      .catch((err) => {
        // setTooltipStatus("fail");
        // setIsInfoToolTipOpen(true);
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
        // setTooltipStatus("fail");
        // setIsInfoToolTipOpen(true);
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
    // TODO: page__content styles is used more than in one component, find a way to make kind of shared styles or something like this
    <div className="page__content">
      <Header email={email} onSignOut={onSignOut} />
      {/* TODO: add header component */}
      {/* <Header /> */}

      <Routes>
        <Route element={<ProtectedRoute loggedIn={isLoggedIn} />}>
          <Route path="/" element={<Main />} />
        </Route>
        <Route path="/signin" element={<Login onLogin={onLogin} />} />
        <Route path="/signup" element={<Register onRegister={onRegister} />} />
      </Routes>
      <Footer />
      <PopupWithForm title="Вы уверены?" name="remove-card" buttonText="Да" />
    </div>
  );
};

export default App;
