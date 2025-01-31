import React from 'react';
import PropTypes from 'prop-types';
import DateModified from 'components/dateModified';
import HeaderMenu from 'components/shared/headerMenu';
import 'styles/global.css';
import "@fontsource/bitter";
import "@fontsource/bitter/700.css";
import "@fontsource/dm-sans";
import "@fontsource/dm-sans/400.css";
import "@fontsource/dm-sans/400-italic.css";
import "@fontsource/dm-sans/700.css";
import "@fontsource/dm-sans/700-italic.css";

const Layout = ({ children, date, menuName }) => (
  <>
    {menuName ? (
      <HeaderMenu menuName={menuName} />
    ) : (
      <uofg-header></uofg-header>
    )}
    <main id="content">
      {children}
      <DateModified date={date} />
    </main>
    <div className="be-ix-link-block"></div>
    <uofg-back-to-top></uofg-back-to-top>
    <uofg-footer></uofg-footer>
  </>
);


Layout.propTypes = {
  children: PropTypes.node.isRequired,
  date: PropTypes.string,
  menuName: PropTypes.string,
}

export default Layout
