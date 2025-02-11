import React from "react";

const CDN_BASE = process.env.UOFG_WC_CDN_BASE_URL?.trim() || "https://cdn.jsdelivr.net/npm";
const UOFG_WEB_COMPONENTS_BASE = `@uoguelph/web-components@${process.env.UOFG_WC_VERSION?.trim() || "1.x.x"}/dist/uofg-web-components`;
const UOFG_STYLES_BASE = `@uoguelph/uofg-styles@${process.env.UOFG_STYLE_VERSION?.trim() || "1.x.x"}/dist`;

export const onRenderBody = ({ setHeadComponents, setPostBodyComponents }) => {
  setHeadComponents([
    <link rel="preconnect" href="https://fonts.googleapis.com" key="https://fonts.googleapis.com" crossOrigin="anonymous" />,
    <link rel="preconnect" href="https://fonts.gstatic.com" key="https://fonts.gstatic.com" crossOrigin="anonymous" />,

    // Bitter and DM Sans
    <link 
      rel="preload" as="style" crossOrigin="anonymous" 
      href="https://fonts.googleapis.com/css2?family=Bitter:wght@700&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,700;1,9..40,300;1,9..40,400;1,9..40,700&display=swap" 
    />,
    <link
      href="https://fonts.googleapis.com/css2?family=Bitter:wght@700&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,700;1,9..40,300;1,9..40,400;1,9..40,700&display=swap"
      key="https://fonts.googleapis.com/css2?family=Bitter:wght@700&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,700;1,9..40,300;1,9..40,400;1,9..40,700&display=swap"
      rel="stylesheet"
    />,
    <link 
      rel="preload" as="style" crossOrigin="anonymous" 
      href={`${CDN_BASE}/${UOFG_WEB_COMPONENTS_BASE}/uofg-web-components.css`} type="text/css" />,

    // Roboto Condensed
    <link rel="preload" href="https://fonts.googleapis.com/css2?family=Roboto+Condensed:wght@400;700" as="style" crossOrigin="anonymous" />,    
    <link 
      href="https://fonts.googleapis.com/css2?family=Roboto+Condensed:wght@400;700" 
      key="https://fonts.googleapis.com/css2?family=Roboto+Condensed:wght@400;700" 
      rel="stylesheet" />,

    // Web Components
    <link rel="preload" as="style" crossOrigin="anonymous" type="text/css" 
      href={`${CDN_BASE}/${UOFG_WEB_COMPONENTS_BASE}/uofg-web-components.css`} />,
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
    
    // U of G Stylesheet
    <link rel="preload" 
      href={`${CDN_BASE}/${UOFG_STYLES_BASE}/index.css`} as="style" crossOrigin="anonymous" type="text/css" />,
    <link
      rel="stylesheet"
      key={`${CDN_BASE}/${UOFG_STYLES_BASE}/index.css`}
      href={`${CDN_BASE}/${UOFG_STYLES_BASE}/index.css`}
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
