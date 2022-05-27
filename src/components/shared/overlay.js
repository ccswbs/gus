import React from "react"
import { GatsbyImage } from "gatsby-plugin-image"
import classNames from "classnames"

const Overlay = ({ children, className }) => (
  <div className={`bg-black-65 h-100 ${className}`}>{children}</div>
)

Overlay.GatsbyImage = ({ children, gatsbyImageData, alt }) => (
  <div style={{ display: "grid" }}>
    <GatsbyImage
      style={{ gridArea: "1/1" }}
      image={gatsbyImageData}
      alt={alt}
    />
    <div style={{ gridArea: "1/1", position: "relative", display: "grid" }}>
      {children}
    </div>
  </div>
)

Overlay.ModalButton = ({ id, children, className, btnClass = true }) => (
  <button
    type="button"
    className={classNames({ btn: btnClass }, className)}
    data-bs-toggle="modal"
    data-bs-target={`#${id}`}
  >
    {children}
  </button>
)

Overlay.Modal = ({ id, children }) => (
  <div id={id} className="modal fade" tabIndex="-1">
    <div className="modal-dialog modal-lg modal-dialog-centered">
      <div className="modal-content">
        <div className="modal-header">
            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div className="modal-body p-0 bg-dark">{children}</div>
      </div>
    </div>
  </div>
)

export default Overlay
