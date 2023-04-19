import React from 'react';
import { withPrefix } from 'gatsby';

export const onRenderBody = ({ setHeadComponents, setPostBodyComponents }) => {
  
    setHeadComponents([
        <script 
            key="https://cdn.bc0a.com/autopilot/f00000000209359/autopilot_sdk.js"
            src="https://cdn.bc0a.com/autopilot/f00000000209359/autopilot_sdk.js"
        />,
        <script
            key="https://unpkg.com/@webcomponents/webcomponentsjs@2.4.4/webcomponents-loader.js"
            src="https://unpkg.com/@webcomponents/webcomponentsjs@2.4.4/webcomponents-loader.js"
        />,
        <script
            key="https://www.uoguelph.ca/web-components/UofGWebComponents-dist.js"
            src="https://www.uoguelph.ca/web-components/UofGWebComponents-dist.js"
            defer
        />,
        <link
            key="https://www.uoguelph.ca/css/UofG-styles-dist.css" 
            rel="stylesheet" 
            href="https://www.uoguelph.ca/css/UofG-styles-dist.css" 
        />,
        <script 
            key={withPrefix("/web-components/ug-header.js")} 
            src={withPrefix("/web-components/ug-header.js")} 
        />,
        <script 
            key={withPrefix("/web-components/ug-footer.js")} 
            src={withPrefix("/web-components/ug-footer.js")} 
        />,
    ])

    setPostBodyComponents([
        <script 
            key="https://ajax.aspnetcdn.com/ajax/jQuery/jquery-3.4.1.min.js" 
            src="https://ajax.aspnetcdn.com/ajax/jQuery/jquery-3.4.1.min.js"
            crossOrigin="anonymous"
        />,
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
        />
    ])
}
