import React from 'react';
import PropTypes from 'prop-types';
import { contentExists } from '../utils/ug-utils';

function Video (props) {
	
	//let Heading = setHeadingLevel(props.headingLevel);
	//let vimeoURL = "https://player.vimeo.com/video/";
	let youtubeURL = "https://www.youtube.com/embed/";
	let playerID = "player" + String(props.playerID);
	let videoID = props.videoURL.substr(props.videoURL.length - 11);
	let videoSrc = youtubeURL + videoID;
	let videoTranscript = props.videoTranscript;
	
	return (
		<React.Fragment>		
		<div className="col-lg-6 col-md-12">
            <div id="youtube-embed">
                <section name="Youtube" className="ui-kit-section">
                    <div className="embed-responsive embed-responsive-16by9">
                        <video className="ugplayer embed-responsive-item" width="100%" id={playerID} preload="none" controls="controls">
                            <source type="video/youtube" src={videoSrc} />
							{contentExists(videoTranscript) ? 
							<><track label="English" kind="subtitles" srclang="en" src={videoTranscript} default="true" />
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
	playerID: PropTypes.number,
	videoURL: PropTypes.string,
	videoTranscript: PropTypes.string,
}
Video.defaultProps = {
	playerID: ``,
	videoURL: ``,
	videoTranscript: ``,
}
export default Video