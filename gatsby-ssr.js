import React from "react"
import Header from './src/components/header'
 
export const onRenderBody = ({ setPreBodyComponents }) => {
    setPreBodyComponents([
        <Header />
    ])
}