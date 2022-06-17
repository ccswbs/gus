import React, { useState } from "react"
import ReactPlayer from "react-player"
import { Modal, CloseButton } from "react-bootstrap"
import { GatsbyImage } from "gatsby-plugin-image"
import classNames from "classnames"
import { useBetween } from "use-between"

const useShowState = () => {
  const [show, setShow] = useState(false);  
  return {
    show,
    setShow
  }
}

const Overlay = ({ children, className }) => {  
  <div className={`bg-black-65 h-100 ${className}`}>{children}</div>
}

export const OverlayImage = ({ children, gatsbyImageData, alt }) => {
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
}

export const ModalButton = ({ id, children, className, btnClass = true }) => {    
  const { setShow } = useBetween(useShowState);
  const handleShow = () => setShow(true);  
  <button
    type="button"
    className={classNames({ btn: btnClass }, className)}
    onClick={handleShow}
  >
    {children}
  </button>
}

export const ModalVideo = ({ id, videoSrc, videoTitle, videoTranscript }) => {
  const { show, setShow } = useBetween(useShowState);
  const handleClose = () => setShow(false);    
  <Modal id={id} dialogClassName="modal-dialog-centered fade" show={show} size="lg" onHide={handleClose}>
    <Modal.Header className="bg-dark border-bottom-0">
      <Modal.Title className="text-white m-0">{videoTitle}</Modal.Title>
      <CloseButton variant="white" onClick={handleClose} />
    </Modal.Header>
    <Modal.Body className="bg-dark">
      <div className="embed-responsive embed-responsive-16by9">
        <ReactPlayer url={videoSrc} width="100%" height="100%" controls playing={show} />
      </div>                
    </Modal.Body>
    <Modal.Footer className="bg-dark border-top-0">
      {videoTranscript && 
      <a className="btn btn-primary w-100" href={videoTranscript}>
        Download transcript<span className="visually-hidden"> for {videoTitle + " video"}
        </span>
      </a>}
    </Modal.Footer>
  </Modal>
}

export default Overlay
