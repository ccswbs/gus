import React from "react"
import PropTypes from "prop-types"
import { graphql } from "gatsby"
import Overlay from "./overlay"
import Video from "./video"
import { Portal } from "react-portal"

import "../../styles/modalVideo.css"

const ModalVideo = ({ widgetData }) => {
  const video = widgetData.relationships?.field_media_video
  const videoId = video?.field_media_oembed_video.split("/").pop()
  const videoType = video?.field_media_oembed_video.includes("vimeo")
    ? "vimeo"
    : "youtube"
  const modalId = `modal-${widgetData.drupal_id}`

  return videoId ? (
    <div className="modal-video" id={`modal-video-${widgetData.drupal_id}`}>
      <Overlay.ModalButton id={modalId} className="play" btnClass={false}>
        <i className="fad fa-play-circle" aria-hidden="true"></i>
        <span className="visually-hidden">Play video: {video.name}</span>
      </Overlay.ModalButton>
      <Portal>
        <Overlay.Modal id={modalId}>
          <Video
            videoID={videoId}
            videoType={videoType}
            videoTitle={video.name}
            videoTranscript={
              video.relationships?.field_media_file?.localFile.publicURL
            }
            videoCC={video.relationships?.field_video_cc?.localFile.publicURL}
          />
        </Overlay.Modal>
      </Portal>
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
        ...MediaRemoteVideoFragment
      }
    }
  }
`
