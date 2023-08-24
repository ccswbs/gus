import React from "react"
/*import Layout from "./src/components/layout"

 export const wrapPageElement = ({ element, props }) => {
  return <Layout {...props}>{element}</Layout>
} */

export const onRenderBody = ({ setHeadComponents, setPostBodyComponents }) => {
  setHeadComponents([
    <link
      rel="preconnect"
      href="https://fonts.googleapis.com"
      key="https://fonts.googleapis.com"
    />,
    <link
      rel="preconnect"
      href="https://fonts.gstatic.com"
      key="https://fonts.gstatic.com"
      crossOrigin="anonymous"
    />,
    <link
      href="https://fonts.googleapis.com/css2?family=Roboto+Condensed:wght@400;700&display=swap"
      key="https://fonts.googleapis.com/css2?family=Roboto+Condensed:wght@400;700&display=swap"
      rel="stylesheet"
    />,
    <link
      rel="stylesheet"
      href="https://unpkg.com/@uoguelph/web-components@1.x.x/dist/uofg-web-components/uofg-web-components.css"
      key="https://unpkg.com/@uoguelph/web-components@1.x.x/dist/uofg-web-components/uofg-web-components.css"
    />,
    <script
      type="module"
      src="https://unpkg.com/@uoguelph/web-components@1.x.x/dist/uofg-web-components/uofg-web-components.esm.js"
      key="https://unpkg.com/@uoguelph/web-components@1.x.x/dist/uofg-web-components/uofg-web-components.esm.js"
    ></script>,
  ])
  setPostBodyComponents([
    <script
      key="https://kit.fontawesome.com/7993323d0c.js"
      src="https://kit.fontawesome.com/7993323d0c.js"
      crossOrigin="anonymous"
      defer
    />,
  ])
}