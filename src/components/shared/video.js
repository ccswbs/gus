import React from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'gatsby';
import { contentExists } from 'utils/ug-utils';

function Video (props) {
    let playerID = props.playerID;
    let videoCC = props.videoCC;
    let videoTranscript = props.videoTranscript;
    let videoType = (props.videoURL.includes("youtube") || props.videoURL.includes("youtu.be") ? `youtube` : `vimeo`);	
    let videoID = (videoType === `youtube` ? props.videoURL.substr(props.videoURL.length - 11) : props.videoURL.substr(18));

    let youtubeURL = "https://www.youtube.com/embed/";
    let vimeoURL = "https://player.vimeo.com/video/";	
    let videoSrc = (videoType === `youtube` ? youtubeURL + videoID : vimeoURL + videoID);
    
    return (
        <React.Fragment>
        <div>
            <div id="video-embed">
                <section name={videoType} className="ui-kit-section">
                    <div className="embed-responsive embed-responsive-16by9">
                        <div className="d-flex justify-content-center">
                            <div className="spinner-grow text-yellow" role="status">
                                <span className="sr-only">Loading...</span>
                            </div>
                        </div>
                        <video className="ugplayer embed-responsive-item" width="100%" id={playerID} preload="none" controls="controls">
                            <source type={`video/` + videoType} src={videoSrc} />
                            {contentExists(videoTranscript) ? 
                            <><track className="caption-input" label="English" kind="subtitles" srclang="en" src={videoCC} default="true" />
                            <link className="transcript-input" rel="transcript" label="English" kind="descriptions" srclang="en" src={videoTranscript} default="true" /></>
                            : ``}
                        </video>
                    </div>
                </section>
            </div>
        </div>
        </React.Fragment>
    )
}
Video.propTypes = {
    playerID: PropTypes.string,
    videoURL: PropTypes.string,
    videoTranscript: PropTypes.string,
    videoCC: PropTypes.string,
}
Video.defaultProps = {
    playerID: ``,
    videoURL: ``,
    videoTranscript: ``,
    videoCC: ``,
}
export default Video

export const query = graphql`
  fragment MediaRemoteVideoFragment on media__remote_video {
    drupal_id
    name
    field_media_oembed_video
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
`