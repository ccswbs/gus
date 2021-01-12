import React from 'react';
import PropTypes from 'prop-types';
//import { setHeadingLevel } from '../utils/ug-utils';

function Video (props) {
	
	//let Heading = setHeadingLevel(props.headingLevel);
	//let vimeoURL = "https://player.vimeo.com/video/";
	//let youtubeURL = "https://www.youtube.com/embed/";
	let videoSrc = props.videoURL;
	let videoTitle = props.videoTitle;
	
	return (
		<React.Fragment>
		 <div className="col-lg-6 col-md-12">
            <div id="youtube-embed">
                <h3 className="sub-section-header">{videoTitle}</h3>
                <section name="Youtube" className="ui-kit-section">
                    <div className="embed-responsive embed-responsive-16by9">
                        <video className="ugplayer embed-responsive-item" width="100%" id="player1" preload="none" controls="controls">
                            <source type="video/youtube" src={videoSrc} />
                        </video>
                    </div>
                </section>
            </div>
        </div>
		</React.Fragment>
	)
}
Video.propTypes = {
	videoData: PropTypes.array,
}
Video.defaultProps = {
	videoData: null,
}
export default Video