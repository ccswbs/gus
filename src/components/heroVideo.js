import React, { Component } from 'react';
import ReactPlayer from 'react-player';
import PropTypes from 'prop-types';
import { contentExists } from '../utils/ug-utils';
import '../styles/heroVideo.css';

class HeroVideo extends Component {
    
    state = {
        playing: true,
        muted: true,
        loop: true,
        videoStatus: " hero-loading",
    }    
    ref = player => {
        this.player = player
    }
    handlePlayPause = () => {
        this.setState({ playing: !this.state.playing })
    }
    
    handleStart = () => {
        this.setState({ videoStatus: " hero-ready" })
    }
    
    render() {

        let videoTranscript = this.props.videoTranscript;
        let videoWidth = this.props.videoWidth;
        let videoHeight = this.props.videoHeight;
        let videoType = (this.props.videoURL.includes("youtube") || this.props.videoURL.includes("youtu.be") ? `youtube` : `vimeo`);	
        let videoID = (videoType === `youtube` ? this.props.videoURL.substr(this.props.videoURL.length - 11) : this.props.videoURL.substr(18));

        let youtubeURL = "https://www.youtube.com/embed/";
        let vimeoURL = "https://player.vimeo.com/video/";	
        let videoSrc = (videoType === `youtube` ? youtubeURL + videoID : vimeoURL + videoID);
        
        let ratio = videoWidth / videoHeight;        
        ratio = +ratio.toFixed(2);
        const aspectRatio = (ratio === 2.34 ? "21by9" : "16by9");

        const { playing, muted, loop, videoStatus, playPause } = this.state;
        
        console.log(videoTranscript);
        
        return (
            <React.Fragment>
            <div className={"hero-controls-" + aspectRatio + videoStatus}>
                <button id="hero-playPause" data-toggle="tooltip" data-placement="bottom" data-selector="true" title={playing ? "Pause" : "Play"} onClick={this.handlePlayPause}>
                    <i className={playing ? "duotoneColors fad fa-pause-circle" : "duotoneColors fad fa-play-circle"}></i>
                    <span className="sr-only">{playing ? "Pause video" : "Play video"}</span>
                </button>
                {contentExists(videoTranscript) ? 
                    <><a id="hero-transcript" href={videoTranscript} download data-toggle="tooltip" data-placement="bottom" data-selector="true" title="Download transcript">
                        <i className="duotoneColors fad fa-file-alt"></i>
                        <span className="sr-only">Download transcript</span>                        
                    </a></>
                : ``}
                <i className="hero-thruster fas fa-spinner fa-spin"></i>
            </div>
            <div className={"embed-responsive embed-responsive-" + aspectRatio}>                
                <ReactPlayer
                    ref={this.ref}
                    className="react-player"
                    url={videoSrc}
                    config={{ vimeo: { playerOptions:{portrait:true} } }}
                    playing={playing}
                    loop={loop}
                    muted={muted}
                    width="100%"
                    height="100%"
                    onStart={this.handleStart}
                />
            </div>      
            </React.Fragment>
        )
    }
}

HeroVideo.propTypes = {
    videoURL: PropTypes.string,
    videoTranscript: PropTypes.string,
    videoCC: PropTypes.string,
    videoWidth: PropTypes.number,
    videoHeight: PropTypes.number,
}
HeroVideo.defaultProps = {
    videoURL: ``,
    videoTranscript: ``,
    videoCC: ``,
    videoWidth: 16,
    videoHeight: 9,
}
export default HeroVideo