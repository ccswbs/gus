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
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
        <link rel="preload" as="style" href="https://fonts.googleapis.com/css2?family=Roboto:wght@100;400;700&display=swap" />
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Roboto:wght@100;400;700&display=swap" media="print" onload="this.media='all'" />

      </head>
      <body {...props.bodyAttributes}>
        <SkipLink mainContent="#content"/>
        {props.preBodyComponents}
        <noscript key="noscript" id="gatsby-noscript">
          This app works best with JavaScript enabled.
        </noscript>
        <script defer src="https://www.uoguelph.ca/web-components/UofGWebComponents-dist.js"></script>
        <Header />
        <div
          key={`body`}
          id="___gatsby"
          dangerouslySetInnerHTML={{ __html: props.body }}
        />
        {props.postBodyComponents}
        <uofg-footer></uofg-footer>                       
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
