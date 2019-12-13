import React from 'react'
import PropTypes from 'prop-types'
import SkipLink from './skiplink'
import Header from './header'
import Footer from './footer'

const Layout = ({ children }) => (
      <>
        <SkipLink mainContent="#content"/>
        <Header />
		<main class="main-container">
			<div class="container page-container">
				<div id="content" class="row row-with-vspace site-content">
					<div class="col-md-12 content-area" id="main-column">
						<main id="main" class="site-main" role="main">
							{children}
						</main>
					</div>
				</div>
			</div>
		</main>
        <Footer />
      </>
)

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
