import React from "react"
import { GatsbyImage, getImage } from "gatsby-plugin-image"

const Overlay = ({ children, className }) => (
  <div className={`bg-black-65 h-100 ${className}`}>{children}</div>
)

Overlay.GatsbyImage = ({ children, gatsbyImageData, alt, className="" }) => (
  <div style={{ display: "grid" }}>
    <GatsbyImage
      style={{ gridArea: "1/1" }}
      className={className}
      image={getImage(gatsbyImageData)}
      alt={alt}
    />
    <div style={{ gridArea: "1/1", position: "relative", display: "grid" }}>
      {children}
    </div>
  </div>
)

export default Overlay
