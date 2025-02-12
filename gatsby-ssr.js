import React from "react";

const CDN_BASE = process.env.UOFG_WC_CDN_BASE_URL?.trim() || "https://cdn.jsdelivr.net/npm";
const UOFG_WEB_COMPONENTS_BASE = `@uoguelph/web-components@${process.env.UOFG_WC_VERSION?.trim() || "1.x.x"}/dist/uofg-web-components`;

export const onRenderBody = ({ setHeadComponents, setPostBodyComponents }) => {
  setHeadComponents([
    <link rel="preconnect" href="https://fonts.googleapis.com" key="https://fonts.googleapis.com" crossOrigin="anonymous" />,
    <link rel="preconnect" href="https://fonts.gstatic.com" key="https://fonts.gstatic.com" crossOrigin="anonymous" />,

    // Roboto and Roboto Condensed
    <link rel="preload" href="https://fonts.googleapis.com/css2?family=Roboto+Condensed:wght@400;700&family=Roboto:ital,wght@0,400;0,700;1,100;1,400&display=swap" as="style" crossOrigin="anonymous" />,    
    <link 
      href="https://fonts.googleapis.com/css2?family=Roboto+Condensed:wght@400;700&family=Roboto:ital,wght@0,400;0,700;1,100;1,400&display=swap" 
      key="https://fonts.googleapis.com/css2?family=Roboto+Condensed:wght@400;700&family=Roboto:ital,wght@0,400;0,700;1,100;1,400&display=swap" 
      rel="stylesheet" />,

    // Web Components
    <link rel="preload" href={`${CDN_BASE}/${UOFG_WEB_COMPONENTS_BASE}/uofg-web-components.css`} as="style" crossOrigin="anonymous" />,
    <link
      rel="stylesheet"
      href={`${CDN_BASE}/${UOFG_WEB_COMPONENTS_BASE}/uofg-web-components.css`}
      key={`${CDN_BASE}/${UOFG_WEB_COMPONENTS_BASE}/uofg-web-components.css`}
    />,
    <link href={`${CDN_BASE}/${UOFG_WEB_COMPONENTS_BASE}/uofg-web-components.esm.js`} rel="preload" as="script" crossOrigin="anonymous" />,
    <script
      type="module"
      src={`${CDN_BASE}/${UOFG_WEB_COMPONENTS_BASE}/uofg-web-components.esm.js`}
      key={`${CDN_BASE}/${UOFG_WEB_COMPONENTS_BASE}/uofg-web-components.esm.js`}
    ></script>,

    // U of G Stylesheet
    <link rel="preload" href="https://cdn.jsdelivr.net/npm/@uoguelph/uofg-styles/dist/index.css" as="style" crossOrigin="anonymous" />,
    <link
      key="https://cdn.jsdelivr.net/npm/@uoguelph/uofg-styles/dist/index.css"
      rel="stylesheet"
      href="https://cdn.jsdelivr.net/npm/@uoguelph/uofg-styles/dist/index.css"
    />,
  ]);
  setPostBodyComponents([
    // FontAwesome kit
    <script
      key="https://kit.fontawesome.com/7993323d0c.js"
      src="https://kit.fontawesome.com/7993323d0c.js"
      crossOrigin="anonymous"
      defer
    />,
    // Bootstrap
    <script
      key="https://cdn.jsdelivr.net/npm/bootstrap@5.1.1/dist/js/bootstrap.bundle.min.js"
      src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.1/dist/js/bootstrap.bundle.min.js"
      crossOrigin="anonymous"
      defer
    />,
  ]);
};
