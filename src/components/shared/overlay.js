import React from "react"
import { GatsbyImage } from "gatsby-plugin-image"
import classNames from "classnames"
import { Modal } from "react-bootstrap"

const Overlay = ({ children, className }) => (

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

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

Overlay.ModalTest = ({ id, children }) => (
  <Modal id={id} className="modal fade" onHide={handleClose} tabIndex="-1">
  <Modal.Body>{children}</Modal.Body>
  </Modal>
)

export default Overlay
