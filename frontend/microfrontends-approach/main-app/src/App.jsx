import React from "react";

import { Route, Routes } from "react-router-dom";

import Footer from "footer/Footer";

import Register from "auth/Register";
import Login from "auth/Login";

import auth from "../lib/api/auth";
import { Link } from "react-router-dom";

import './styles/page/page.css';

const App = () => {
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
        // setIsLoggedIn(true);
        // setEmail(email);
        // history.push("/");
      })
      .catch((err) => {
        // setTooltipStatus("fail");
        // setIsInfoToolTipOpen(true);
      });
  }

  return (
    // TODO: page__content styles is used more than in one component, find a way to make kind of shared styles or something like this
    <div className="page__content">
      {/* TODO: add header component */}
      {/* <Header /> */}

      <Link to="/signin" children="Go to login" />
      <Routes>
        <Route path="/signin" element={<Login onLogin={onLogin} />} />
        <Route path="/signup" element={<Register onRegister={onRegister} />} />
      </Routes>
      <Footer />
    </div>
  );
};

const Test = () => <div>test</div>

export default App;
