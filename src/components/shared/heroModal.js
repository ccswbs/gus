import React from 'react'
import PropTypes from "prop-types"
import { graphql } from "gatsby"
import ModalVideo from 'react-modal-video'
//import '../../../node_modules/react-modal-video/scss/modal-video.scss'
import "../../styles/modalVideo.css"

class HeroModal extends React.Component {

  constructor () {
    super()
    this.state = {
      isOpen: false
    }
    this.openModal = this.openModal.bind(this)
  }

  openModal () {
    this.setState({isOpen: true})
  }

  render () {
      
    const video = this.props.widgetData.relationships?.field_media_video
    const videoURL = video?.field_media_oembed_video;
    const videoType = videoURL.includes("vimeo") ? "vimeo" : "youtube"
    const videoId = (videoType === `youtube` ? videoURL?.substr(videoURL?.length - 11) : videoURL?.substr(18));
    //const modalId = `modal-${widgetData.drupal_id}`
    
    console.log(videoURL)
    
    return (
      <React.Fragment>
        <ModalVideo channel={videoType} isOpen={this.state.isOpen} videoId={videoId} onClose={() => this.setState({isOpen: false})} />
        <button className="play" onClick={this.openModal}>
            <i className="fad fa-play-circle" aria-hidden="true"></i>
            <span className="visually-hidden">Play video: {video.name}</span>
        </button>
      </React.Fragment>
    )
  }
}

export default HeroModal

HeroModal.propTypes = {
  widgetData: PropTypes.object.isRequired,
}

export const query = graphql`
  fragment ModalVideoWidgetFragment on paragraph__modal_video_widget {
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
            uri {
              url
            }
          }
          field_video_cc {
            uri {
              url
            }
          }
        }
      }
    }
  }
`