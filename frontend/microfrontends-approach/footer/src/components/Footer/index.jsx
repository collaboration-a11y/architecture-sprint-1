import React from 'react';

import '../../styles/footer/footer.css'

function Footer() {
  // TODO: page__section is not loaded, find a way to reuse from global state
  return (
    <footer className="footer page__section">
      <p className="footer__copyright">
        © 2021 Mesto Russia
      </p>
    </footer>
  );
}

export default Footer;
