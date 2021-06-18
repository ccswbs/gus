import React from 'react';
import PropTypes from 'prop-types';
import { contentExists } from '../utils/ug-utils';

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
		<div className="col-lg-6 col-md-12">
            <div id="video-embed">
                <section name={videoType} className="ui-kit-section">
                    <div className="embed-responsive embed-responsive-16by9">
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