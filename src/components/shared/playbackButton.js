import React from "react"
import PropTypes from "prop-types"
import { graphql } from "gatsby"
import Overlay from "./overlay"
import Video from "./video"
import { Portal } from "react-portal"

import "../../styles/playbackButton.css"

const PlaybackButton = ({ widgetData }) => {
  const video = widgetData.relationships?.field_media_video
  const videoId = video?.field_media_oembed_video.split("/").pop()
  const videoType = video?.field_media_oembed_video.includes("vimeo")
    ? "vimeo"
    : "youtube"
  const modalId = `modal-${widgetData.drupal_id}`

  return videoId ? (
    <div
      className="playback-button"
      id={`playback-button-${widgetData.drupal_id}`}
    >
      <Overlay.ModalButton id={modalId} className="play">
        <i
          class="fad fa-play-circle"
          // onclick="ga('send', 'event', 'Play Video', 'play', 'Careers Video');"
          aria-hidden="true"
        ></i>
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

export default PlaybackButton

PlaybackButton.propTypes = {
  widgetData: PropTypes.object.isRequired,
}

export const query = graphql`
  fragment ParagraphPlaybackButtonWidgetFragment on paragraph__playback_button_widget {
    id
    drupal_id
    relationships {
      field_media_video {
        ...MediaRemoteVideoFragment
      }
    }
  }
`
