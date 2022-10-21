import React from 'react';
import PropTypes from 'prop-types';
import DateModified from 'components/dateModified';
import Footer from "components/footer"
import Header from "components/header"
import 'styles/global.css';
import "@fontsource/roboto"
import "@fontsource/roboto/700.css"
import "@fontsource/roboto/300.css"
import "@fontsource/roboto/100-italic.css"
import "@fontsource/roboto/400-italic.css"

const Layout = ({ children, date, menuName }) => (
      <>
        <Header menuName={menuName} />
        {/* <uofg-header><HeaderMenu menuName={menuName} /></uofg-header> */}
        <main id="content">
          {children}
          <DateModified date={date}/>
        </main>
        <Footer />     
      </>
)

Layout.propTypes = {
  children: PropTypes.node.isRequired,
  date: PropTypes.string,
  menuName: PropTypes.string,
}

export default Layout
