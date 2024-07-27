import React from "react";
import { Link } from "react-router-dom";

const SignOutLink = () => {
  return (
    <Link className="header__auth-link" to="/signin">
      Войти
    </Link>
  );
};

export default SignOutLink;
