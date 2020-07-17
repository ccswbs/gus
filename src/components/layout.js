import React from 'react'
import PropTypes from 'prop-types'
import SkipLink from './skiplink'
import Header from './header'
import Footer from './footer'
import "../styles/global.css"

const Layout = ({ children }) => (
      <>
        <SkipLink mainContent="#content"/>
        <Header />
        <main className="main-container">
          {children}
        </main>
        <Footer />
      </>
)

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
