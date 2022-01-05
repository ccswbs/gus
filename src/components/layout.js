import React from 'react';
import PropTypes from 'prop-types';
import DateModified from './dateModified';
import HeaderMenu from './headerMenu';
import '../styles/global.css';


const Layout = ({ children, date, menuName }) => (
      <>
        <uofg-header><HeaderMenu menuName={menuName} /></uofg-header>
        <main id="content" className="main-container">
          {children}
          <DateModified date={date}/>
        </main>
        <uofg-footer></uofg-footer>
        
      </>
)

Layout.propTypes = {
  children: PropTypes.node.isRequired,
  date: PropTypes.string,
  menuName: PropTypes.string,
}

export default Layout
