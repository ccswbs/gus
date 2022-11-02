import React from 'react';

export const onRenderBody = ({ setHeadComponents, setPostBodyComponents }) => {
  
    setHeadComponents([
        <script
            key="https://unpkg.com/@webcomponents/webcomponentsjs@2.4.4/webcomponents-loader.js"
            src="https://unpkg.com/@webcomponents/webcomponentsjs@2.4.4/webcomponents-loader.js"
        />,
        <script
            key="https://www.uoguelph.ca/web-components/UofGWebComponents-dist.js"
            src="https://www.uoguelph.ca/web-components/UofGWebComponents-dist.js"
            defer
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