import React from "react";

const CDN_BASE = process.env.UOFG_WC_CDN_BASE_URL?.trim() || "https://cdn.jsdelivr.net/npm";
const UOFG_WEB_COMPONENTS_BASE = `@uoguelph/web-components@${process.env.UOFG_WC_VERSION?.trim() || "1.x.x"}/dist/uofg-web-components`;
const UOFG_STYLES_BASE = `@uoguelph/uofg-styles@${process.env.UOFG_STYLE_VERSION?.trim() || "1.x.x"}/dist`;

export const onRenderBody = ({ setHeadComponents, setPostBodyComponents }) => {
  setHeadComponents([
    <link rel="preconnect" href="https://fonts.googleapis.com" key="https://fonts.googleapis.com" crossOrigin="anonymous" />,
    <link rel="preconnect" href="https://fonts.gstatic.com" key="https://fonts.gstatic.com" crossOrigin="anonymous" />,
    <link 
      rel="preload" as="style" crossOrigin="anonymous" 
      href="https://fonts.googleapis.com/css2?family=Bitter:ital,wght@0,100..900;1,100..900&family=DM+Sans:ital,opsz,wght@0,9..40,100..1000;1,9..40,100..1000&display=swap" 
    />,
    <link
      href="https://fonts.googleapis.com/css2?family=Bitter:ital,wght@0,100..900;1,100..900&family=DM+Sans:ital,opsz,wght@0,9..40,100..1000;1,9..40,100..1000&display=swap"
      key="https://fonts.googleapis.com/css2?family=Bitter:ital,wght@0,100..900;1,100..900&family=DM+Sans:ital,opsz,wght@0,9..40,100..1000;1,9..40,100..1000&display=swap"
      rel="stylesheet"
    />,
    <link 
      rel="preload" as="style" crossOrigin="anonymous" 
      href={`${CDN_BASE}/${UOFG_WEB_COMPONENTS_BASE}/uofg-web-components.css`} type="text/css" />,
    <link
      rel="stylesheet"
      href={`${CDN_BASE}/${UOFG_WEB_COMPONENTS_BASE}/uofg-web-components.css`}
      key={`${CDN_BASE}/${UOFG_WEB_COMPONENTS_BASE}/uofg-web-components.css`}
    />,
    <link 
      href={`${CDN_BASE}/${UOFG_WEB_COMPONENTS_BASE}/uofg-web-components.esm.js`} 
      rel="preload" as="script" type="text/javascript" crossOrigin="anonymous" />,
    <script
      type="module"
      src={`${CDN_BASE}/${UOFG_WEB_COMPONENTS_BASE}/uofg-web-components.esm.js`}
      key={`${CDN_BASE}/${UOFG_WEB_COMPONENTS_BASE}/uofg-web-components.esm.js`}
    ></script>,
    <link rel="preload" 
      href={`${CDN_BASE}/${UOFG_STYLES_BASE}/index.css`} as="style" type="text/css" />,
    <link
      rel="stylesheet"
      key={`${CDN_BASE}/${UOFG_STYLES_BASE}/index.css`}
      href={`${CDN_BASE}/${UOFG_STYLES_BASE}/index.css`}
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
    />
  ]);
};
