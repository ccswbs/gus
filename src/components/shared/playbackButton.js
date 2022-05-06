import React from "react"
import PropTypes from "prop-types"
import { graphql } from "gatsby"
import ReactPlayer from "react-player"
import { contentExists } from "../../utils/ug-utils"
import { Modal, modalApi } from "./modal"

import "../../styles/playbackButton.css"

const PlaybackButton = ({ widgetData }) => {
  const video = widgetData.relationships?.field_media_video
  const videoURL = video?.field_media_oembed_video
  const modalId = `modal-${widgetData.drupal_id}`

  return contentExists(videoURL) ? (
    <div
      className="playback-button"
      id={`playback-button-${widgetData.drupal_id}`}
    >
      <button className="play" onClick={() => modalApi.show(modalId)}>
        <i
          class="fad fa-play-circle"
          // onclick="ga('send', 'event', 'Play Video', 'play', 'Careers Video');"
          aria-hidden="true"
        ></i>
        <span class="sr-only">Play video{video.name && `: ${video.name}`}</span>
      </button>
      <Modal
        id={modalId}
        showHeader={false}
        showFooter={false}
        centered
        content={<ReactPlayer width="100%" url={videoURL} controls={true} />}
      ></Modal>
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
        drupal_id
        field_media_oembed_video
        id
      }
    }
  }
`
