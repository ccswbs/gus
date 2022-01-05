import React from 'react'

export const onRenderBody = ({ setHeadComponents, setPostBodyComponents }) => {
  
  setHeadComponents([
    <script
      key="https://unpkg.com/@webcomponents/webcomponentsjs@2.4.4/webcomponents-loader.js"
      src="https://unpkg.com/@webcomponents/webcomponentsjs@2.4.4/webcomponents-loader.js"
    />,
    <link key="https://fonts.gstatic.com" rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />,
    <link key="https://fonts.googleapis.com/css2?family=Roboto:wght@100;400;700&display=swap" rel="preload" as="style" href="https://fonts.googleapis.com/css2?family=Roboto:wght@100;400;700&display=swap" />,
    <link key="https://fonts.googleapis.com/css2?family=Roboto:wght@100;400;700&display=swap" rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Roboto:wght@100;400;700&display=swap" media="print" onLoad="this.media='all'" />
  ])
  
  setPostBodyComponents([
    <script key="https://ajax.aspnetcdn.com/ajax/jQuery/jquery-3.4.1.min.js" 
      src="https://ajax.aspnetcdn.com/ajax/jQuery/jquery-3.4.1.min.js"
      crossOrigin="anonymous"
      defer
    />,
    <script
      key="https://kit.fontawesome.com/7993323d0c.js"
      src="https://kit.fontawesome.com/7993323d0c.js"
      crossOrigin="anonymous"
      defer
    />,
    <script
      key="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.bundle.min.js"
      src="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.bundle.min.js"
      crossOrigin="anonymous"
      defer
    />,
    <script
      key="https://www.uoguelph.ca/web-components/UofGWebComponents-dist.js"
      src="https://www.uoguelph.ca/web-components/UofGWebComponents-dist.js"
      defer
    />,
    <script key="https://www.uoguelph.ca/js/uog-scripts-dist.js" src="https://www.uoguelph.ca/js/uog-scripts-dist.js" defer></script>
  ])
}