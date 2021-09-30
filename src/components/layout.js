import React from 'react'
import PropTypes from 'prop-types'
import DateModified from './dateModified'
import '../styles/global.css'


const Layout = ({ children, date }) => (
      <>
        <Helmet>
          <script defer src="https://ajax.aspnetcdn.com/ajax/jQuery/jquery-3.4.1.min.js" crossOrigin="anonymous"></script>
          <script defer src="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.bundle.min.js" crossOrigin="anonymous"></script>
          <script defer type="text/javascript" src="https://www.uoguelph.ca/js/uog-scripts-dist.js"></script>
        </Helmet>
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
