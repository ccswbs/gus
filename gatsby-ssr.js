import React from "react";

const UNPKG_WC_CDN = "https://unpkg.com/@uoguelph/web-components@1.x.x/dist/uofg-web-components";

export const onRenderBody = ({ setHeadComponents, setPostBodyComponents }) => {
  setHeadComponents([
    <script
      key="https://cdn.bc0a.com/autopilot/f00000000209359/autopilot_sdk.js"
      src="https://cdn.bc0a.com/autopilot/f00000000209359/autopilot_sdk.js"
    />,
    <script
      type="module"
      src={`${process.env.UOFG_WC_BASE_URL || UNPKG_WC_CDN}/uofg-web-components.esm.js`}
      key={`${process.env.UOFG_WC_BASE_URL || UNPKG_WC_CDN}/uofg-web-components.esm.js`}
    />,
    <link
      rel="stylesheet"
      href={`${process.env.UOFG_WC_BASE_URL || UNPKG_WC_CDN}/uofg-web-components.css`}
      key={`${process.env.UOFG_WC_BASE_URL || UNPKG_WC_CDN}/uofg-web-components.css`}
    />,
    <link rel="preconnect" href="https://fonts.googleapis.com" key="https://fonts.googleapis.com" />,
    <link rel="preconnect" href="https://fonts.gstatic.com" key="https://fonts.gstatic.com" crossOrigin="anonymous" />,
    <link
      href="https://fonts.googleapis.com/css2?family=Roboto+Condensed:wght@400;700&display=swap"
      key="https://fonts.googleapis.com/css2?family=Roboto+Condensed:wght@400;700&display=swap"
      rel="stylesheet"
    />,
    <link
      key="https://www.uoguelph.ca/css/UofG-styles-dist.css"
      rel="stylesheet"
      href="https://www.uoguelph.ca/css/UofG-styles-dist.css"
    />,
  ]);

  setPostBodyComponents([
    <script
      key="https://kit.fontawesome.com/7993323d0c.js"
      src="https://kit.fontawesome.com/7993323d0c.js"
      crossOrigin="anonymous"
      defer
    />,
    <script
      key="https://cdn.jsdelivr.net/npm/bootstrap@5.1.1/dist/js/bootstrap.bundle.min.js"
      src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.1/dist/js/bootstrap.bundle.min.js"
      crossOrigin="anonymous"
      defer
    />,
    <script
      key="https://www.uoguelph.ca/js/uog-scripts-gatsby-dist.js"
      src="https://www.uoguelph.ca/js/uog-scripts-gatsby-dist.js"
      defer
    />,
  ]);
};
