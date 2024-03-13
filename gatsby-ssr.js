import React from "react";

const wcVersion = process.env.UOFG_WC_VERSION || "1.x.x";
const wcJS = `https://unpkg.com/@uoguelph/web-components@${wcVersion}/dist/uofg-web-components/uofg-web-components.esm.js`;
const wcCSS = `https://unpkg.com/@uoguelph/web-components@${wcVersion}/dist/uofg-web-components/uofg-web-components.css`;

export const onRenderBody = ({ setHeadComponents, setPostBodyComponents }) => {
  setHeadComponents([
    <script
      key="https://cdn.bc0a.com/autopilot/f00000000209359/autopilot_sdk.js"
      src="https://cdn.bc0a.com/autopilot/f00000000209359/autopilot_sdk.js"
    />,
    <script type="module" src={wcJS} key={wcJS} />,
    <link rel="stylesheet" href={wcCSS} key={wcCSS} />,
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
