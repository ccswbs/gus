import React from 'react';
import PropTypes from 'prop-types';
import HeaderMenu from 'components/shared/headerMenu';
import 'styles/global.css';

const Layout = ({ children, menuName }) => (
  <>
    {menuName ? (
      <HeaderMenu menuName={menuName} />
    ) : (
      <uofg-header></uofg-header>
    )}
    <main id="content">
      {children}
    </main>
    <uofg-back-to-top></uofg-back-to-top>
    <uofg-footer></uofg-footer>
  </>
);


Layout.propTypes = {
  children: PropTypes.node.isRequired,
  menuName: PropTypes.string,
}

export default Layout
