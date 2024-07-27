import React from 'react'

const HeaderWrapper = ({ email, onSignOut }) => {
  return (
    <div className="header__wrapper">
      <p className="header__user">{email}</p>
      <button className="header__logout" onClick={onSignOut}>
        Выйти
      </button>
    </div>
  );
};

export default HeaderWrapper;
