import React from 'react';
import { Helmet } from 'react-helmet'
import PropTypes from 'prop-types';

function Video (props) {
	
	//let Heading = setHeadingLevel(props.headingLevel);
	//let vimeoURL = "https://player.vimeo.com/video/";
	let youtubeURL = "https://www.youtube.com/embed/";
	let videoSrc = youtubeURL + props.videoSrc;
	let videoTitle = props.videoTitle;
	
	return (
		<React.Fragment>
		<Helmet><script defer type="text/javascript" src="/assets/uog-media-player.js"></script></Helmet>
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
	videoTitle: PropTypes.string,
	videoSrc: PropTypes.string,
}
Video.defaultProps = {
	videoTitle: ``,
	videoSrc: ``,
}
export default Video