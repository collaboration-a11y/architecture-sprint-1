import React from "react";
import { Route, Routes, useNavigate } from "react-router-dom";

import PopupWithForm from "lib-app/PopupWithForm";
import InfoTooltip from "lib-app/InfoTooltip";
import Header from "header/Header";
import Login from "auth/Login";
import Register from "auth/Register";
import * as auth from 'auth/authApi'; 
import Footer from "footer/Footer";

import { useApplication } from "main-app/store";

import Main from "./components/Main/index.jsx";
import ProtectedRoute from "./lib/routes/ProtectedRoute.jsx";

import "lib-app/page-styles";

const App = () => {
  const navigate = useNavigate();

  const {
    setCurrentUser,
    api,
    setEmail,
    isLoggedIn,
    setIsLoggedIn,
    setApplicationTooltip,
    applicationTooltip,
  } = useApplication();

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
      <Header />

      <Routes>
        <Route element={<ProtectedRoute loggedIn={isLoggedIn} />}>
          <Route path="/" element={<Main />} />
        </Route>
        <Route path="/signin" element={<Login />} />
        <Route path="/signup" element={<Register />} />
      </Routes>
      <Footer />
      <PopupWithForm title="Вы уверены?" name="remove-card" buttonText="Да" />
      <InfoTooltip
        isOpen={applicationTooltip.open}
        onClose={() => {
          setApplicationTooltip({
            status: "null",
            open: false,
          });
        }}
        status={applicationTooltip.status}
      />
    </div>
  );
};

export default App;
