import React from "react"
import PropTypes from "prop-types"

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
        <script data-search-pseudo-elements="" src="https://kit.fontawesome.com/7993323d0c.js"></script>
        <script src="https://kit-pro.fontawesome.com/releases/latest/js/pro.min.js" data-auto-a11y="true" data-auto-fetch-svg="" data-fetch-svg-from="https://kit-pro.fontawesome.com/releases/latest/svgs" defer=""></script>
        <link href="https://www.uoguelph.ca/presidential-search/css/site-styles.css" rel="stylesheet"></link>
        <link href="https://fonts.googleapis.com/css?family=Roboto:400,700" rel="preconnect" crossOrigin=""></link>
        {props.headComponents}
      </head>
      <body {...props.bodyAttributes}>
        {props.preBodyComponents}
        <noscript key="noscript" id="gatsby-noscript">
          This app works best with JavaScript enabled.
        </noscript>
        <div
          key={`body`}
          id="___gatsby"
          dangerouslySetInnerHTML={{ __html: props.body }}
        />
        {props.postBodyComponents}
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
