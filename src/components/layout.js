import React from 'react';
import PropTypes from 'prop-types';
import DateModified from 'components/dateModified';
import HeaderMenu from 'components/shared/headerMenu';
import 'styles/global.css';


const Layout = ({ children, date, menuName }) => (
      <>
        <uofg-header><HeaderMenu menuName={menuName} /></uofg-header>
        {children}
        <DateModified date={date}/>
        <uofg-footer></uofg-footer>        
      </>
)

Layout.propTypes = {
  children: PropTypes.node.isRequired,
  date: PropTypes.string,
  menuName: PropTypes.string,
}

export default Layout
