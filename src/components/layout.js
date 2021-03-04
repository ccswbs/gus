import React from 'react'
import PropTypes from 'prop-types'
import DateModified from './dateModified'
import '../styles/global.css'


const Layout = ({ children, date }) => (
      <>
        <main id="content" className="main-container">
          {children}
          <DateModified date={date}/>
        </main>
      </>
)

Layout.propTypes = {
  children: PropTypes.node.isRequired,
  date: PropTypes.string,
}

export default Layout
