import React from "react"

const Banner = ({id, children, className}) => (
    <div id="rotator" className={className} >
        {children}
    </div>
)

Banner.NoImage = ({children}) => (
    <div id="rotator" className="no-thumb">
        {children}
    </div>
)

Banner.FancyTitle = ({children}) => (
    <div className={`container ft-container`}>
        <h1 className="fancy-title">
            {children}
        </h1>
    </div>
)


export default Banner