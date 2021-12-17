import React from 'react'

export const onRenderBody = ({ setHeadComponents, setPostBodyComponents }) => {
  
  setHeadComponents([
    <script
      key="https://unpkg.com/@webcomponents/webcomponentsjs@2.4.4/webcomponents-loader.js"
      src="https://unpkg.com/@webcomponents/webcomponentsjs@2.4.4/webcomponents-loader.js"
    />,
    <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin />,
    <link rel="preload" as="style" href="https://fonts.googleapis.com/css2?family=Roboto:wght@100;400;700&display=swap" />,
    <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Roboto:wght@100;400;700&display=swap" media="print" onload="this.media='all'" />
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
    />
  ])
}