import React from 'react'
import PropTypes from 'prop-types'
import SkipLink from './components/skiplink'
import Header from './components/header'

export default function HTML(props) {
  return (
    <html {...props.htmlAttributes}>
      <head>
        <meta charSet="utf-8" />
        <meta httpEquiv="x-ua-compatible" content="ie=edge" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, shrink-to-fit=no"
        />
        {props.headComponents}
		<script data-search-pseudo-elements defer src="https://kit.fontawesome.com/7993323d0c.js" crossOrigin="anonymous"></script>
		<script src="https://unpkg.com/@webcomponents/webcomponentsjs@2.4.4/webcomponents-loader.js"></script>		
      </head>
      <body {...props.bodyAttributes}>
        <SkipLink mainContent="#content"/>
        {props.preBodyComponents}
        <noscript key="noscript" id="gatsby-noscript">
          This app works best with JavaScript enabled.
        </noscript>
		<script defer src="https://www.uoguelph.ca/web-components/UofGHeader-dist.js"></script>
		{/* <script defer src="https://www.uoguelph.ca/web-components/UofGDropdownMenu-dist.js"></script>
		<script defer src="https://www.uoguelph.ca/web-components/UofGIcon-dist.js"></script> */}
        <Header />
        <div
          key={`body`}
          id="___gatsby"
          dangerouslySetInnerHTML={{ __html: props.body }}
        />
        {props.postBodyComponents}
		<uofg-footer></uofg-footer>
		<script defer src="https://www.uoguelph.ca/web-components/UofGFooter-dist.js"></script>
        <script defer src="https://ajax.aspnetcdn.com/ajax/jQuery/jquery-3.4.1.min.js" crossOrigin="anonymous"></script>
        <script defer src="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.bundle.min.js" crossOrigin="anonymous"></script>
        <script defer type="text/javascript" src="//cdn.jsdelivr.net/npm/slick-carousel@1.8.1/slick/slick.min.js" crossOrigin="anonymous"></script>
      </body>
    </html>
  )
}

HTML.propTypes = {
  htmlAttributes: PropTypes.object,
  headComponents: PropTypes.array,
  bodyAttributes: PropTypes.object,
  preBodyComponents: PropTypes.array,
  body: PropTypes.string,
  postBodyComponents: PropTypes.array,
}
