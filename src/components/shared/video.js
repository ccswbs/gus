import React from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'gatsby';

function Video (props) {
    let videoTitle = props.videoTitle;
    let videoTranscript = props.videoTranscript;
    let videoType = props.videoType;
    let videoID = props.videoID;
    let videoWidth = props.videoWidth;
    let videoHeight = props.videoHeight;
    let ratio = videoWidth / videoHeight;
    ratio = +ratio.toFixed(2);
    const aspectRatio = (ratio === 2.34 ? "21by9" : "16by9");

    const youtubeURL = "https://www.youtube.com/embed/";
    const vimeoURL = "https://player.vimeo.com/video/";
    let videoSrc = (videoType === `youtube` ? youtubeURL + videoID : vimeoURL + videoID);

    return (<>
        <div className={"embed-responsive embed-responsive-" + aspectRatio}>
            <iframe allowFullScreen src={videoSrc} title={videoTitle ? videoTitle : videoType + " video player"} />
        </div>
        {videoTranscript && <a className="btn btn-primary w-100" href={videoTranscript}>Download transcript<span className="visually-hidden"> for {videoTitle + " video"}</span></a>}
    </>)
}
Video.propTypes = {
    videoURL: PropTypes.string,
    videoTranscript: PropTypes.string,
    videoTitle: PropTypes.string,
    videoWidth: PropTypes.number,
    videoHeight: PropTypes.number,
}
Video.defaultProps = {
    videoURL: ``,
    videoTranscript: ``,
    videoTitle: ``,
    videoWidth: 16,
    videoHeight: 9,
}
export default Video

export const query = graphql`
  fragment MediaRemoteVideoFragment on media__remote_video {
    drupal_id
    name
    field_media_oembed_video
    field_video_height
    field_video_width
    relationships {
      field_media_file {
        publicUrl
      }
      field_video_cc {
        publicUrl
      }
    }
  }
`
