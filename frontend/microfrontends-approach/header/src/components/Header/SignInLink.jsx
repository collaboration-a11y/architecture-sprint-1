import React from "react";

import { Link } from "react-router-dom";

const SignInLink = () => {
  return (
    <Link className="header__auth-link" to="/signup">
      Регистрация
    </Link>
  );
};

export default SignInLink;
