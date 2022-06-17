import React, { useState } from "react"
import ReactPlayer from "react-player"
import PropTypes from "prop-types"
import { graphql } from "gatsby"
import { Modal, CloseButton } from "react-bootstrap"
import "../../styles/modalVideo.css"

const ModalVideo = ({ widgetData }) => {
    
    const video = widgetData.relationships?.field_media_video;
    const modalId = `modal-${widgetData.drupal_id}`;
    const videoSrc = video?.field_media_oembed_video;
    const videoTitle = video?.name;
    const videoTranscript = video?.relationships?.field_media_file?.localFile.publicURL;

    const [show, setShow] = useState(false);    
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return video ? (
        <div id={modalId} className="modal-video">
            <button type="button" className="play" onClick={handleShow}>
                <i className="fad fa-play-circle" aria-hidden="true"></i>
                <span className="visually-hidden">Play video: {videoTitle}</span>
            </button>
            <Modal dialogClassName="modal-dialog-centered fade" show={show} size="lg" onHide={handleClose}>
                <Modal.Header className="bg-dark border-bottom-0">
                    <Modal.Title className="fw-normal text-white m-0">{videoTitle}</Modal.Title>
                    <CloseButton variant="white" aria-label="Hide" onClick={handleClose} />
                </Modal.Header>
                <Modal.Body className="bg-dark">
                    <div className="embed-responsive embed-responsive-16by9">
                        <ReactPlayer url={videoSrc} width="100%" height="100%" controls playing={show} />
                    </div>                
                </Modal.Body>
                <Modal.Footer className="bg-dark border-top-0">
                    {videoTranscript && <a className="btn btn-primary w-100" href={videoTranscript}>Download transcript<span className="visually-hidden"> for {videoTitle + " video"}</span></a>}
                </Modal.Footer>
            </Modal>
        </div>
    ) : null
}

export default ModalVideo

ModalVideo.propTypes = {
  widgetData: PropTypes.object.isRequired,
}

export const query = graphql`
  fragment ParagraphModalVideoWidgetFragment on paragraph__modal_video_widget {
    id
    drupal_id
    relationships {
      field_media_video {
        drupal_id
        name
        field_media_oembed_video
        field_video_height
        field_video_width
        relationships {
          field_media_file {
            localFile {
              publicURL
            }
          }
          field_video_cc {
            localFile {
              publicURL
            }
          }
        }
      }
    }
  }
`
