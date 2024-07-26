import React from "react";
import { Link, useNavigate } from "react-router-dom";

import { useApplication } from "main-app/store";

import * as auth from '../../lib/api/index.js';

import "../../styles/auth-form/auth-form.css";
function Register() {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  const { setApplicationTooltip } = useApplication();
  const navigate = useNavigate();

  function onRegister({ email, password }) {
    auth
      .register(email, password)
      .then((res) => {
        setApplicationTooltip({
          status: "success",
          open: true,
        });
        navigate("/signin");
      })
      .catch((err) => {
        setApplicationTooltip({
          status: "fail",
          open: true,
        });
      });
  }

  function handleSubmit(e) {
    e.preventDefault();
    const userData = {
      email,
      password,
    };
    onRegister(userData);
  }
  return (
    <div className="auth-form">
      <form className="auth-form__form" onSubmit={handleSubmit}>
        <div className="auth-form__wrapper">
          <h3 className="auth-form__title">Регистрация</h3>
          <label className="auth-form__input">
            <input
              type="text"
              name="email"
              id="email"
              className="auth-form__textfield"
              placeholder="Email"
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </label>
          <label className="auth-form__input">
            <input
              type="password"
              name="password"
              id="password"
              className="auth-form__textfield"
              placeholder="Пароль"
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </label>
        </div>
        <div className="auth-form__wrapper">
          <button className="auth-form__button" type="submit">
            Зарегистрироваться
          </button>
          <p className="auth-form__text">
            Уже зарегистрированы?{" "}
            <Link className="auth-form__link" to="/signin">
              Войти
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
}

export default Register;
