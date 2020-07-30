import React from 'react'
import PropTypes from 'prop-types'
import SkipLink from './skiplink'
import Header from './header'
import DateModified from '../components/datemodified'
import Footer from './footer'
import "../styles/global.css"

const Layout = ({ children, date }) => (
      <>
        <SkipLink mainContent="#content"/>
        <Header />
        <main className="main-container">
          {children}
        </main>
        <DateModified date={date}/>
        <Footer />
      </>
)

Layout.propTypes = {
  children: PropTypes.node.isRequired,
  date: PropTypes.string,
}

export default Layout
