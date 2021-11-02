import React from 'react';
import ReactPlayer from 'react-player';
import PropTypes from 'prop-types';
import { contentExists } from '../utils/ug-utils';

function HeroVideo (props) {
	let playerID = props.playerID;
	let videoCC = props.videoCC;
    let videoSize = props.videoSize;
	let videoTranscript = props.videoTranscript;
	let videoType = (props.videoURL.includes("youtube") || props.videoURL.includes("youtu.be") ? `youtube` : `vimeo`);	
	let videoID = (videoType === `youtube` ? props.videoURL.substr(props.videoURL.length - 11) : props.videoURL.substr(18));

	let youtubeURL = "https://www.youtube.com/embed/";
	let vimeoURL = "https://player.vimeo.com/video/";	
	let videoSrc = (videoType === `youtube` ? youtubeURL + videoID : vimeoURL + videoID);
	
	return (
		<React.Fragment>        
        <div style="max-width:100%; max-height:60rem;" className={"embed-responsive embed-responsive-" + videoSize}>
        <ReactPlayer url={videoSrc}
            playing
            loop
            muted
            width="100%"
            height="100%"
        />
        </div>      
        </React.Fragment>
	)
}
HeroVideo.propTypes = {
	playerID: PropTypes.string,
	videoURL: PropTypes.string,
	videoTranscript: PropTypes.string,
	videoCC: PropTypes.string,
    videoSize: PropTypes.string,
}
HeroVideo.defaultProps = {
	playerID: ``,
	videoURL: ``,
	videoTranscript: ``,
	videoCC: ``,
    videoSize: `16by9`,
}
export default HeroVideo