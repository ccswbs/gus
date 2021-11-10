import React, { Component } from 'react';
import ReactPlayer from 'react-player';
import PropTypes from 'prop-types';
//import { contentExists } from '../utils/ug-utils';
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
        let playerID = this.props.playerID;
        let videoCC = this.props.videoCC;
        let videoSize = this.props.videoSize;
        let videoTranscript = this.props.videoTranscript;
        let videoType = (this.props.videoURL.includes("youtube") || this.props.videoURL.includes("youtu.be") ? `youtube` : `vimeo`);	
        let videoID = (videoType === `youtube` ? this.props.videoURL.substr(this.props.videoURL.length - 11) : this.props.videoURL.substr(18));

        let youtubeURL = "https://www.youtube.com/embed/";
        let vimeoURL = "https://player.vimeo.com/video/";	
        let videoSrc = (videoType === `youtube` ? youtubeURL + videoID : vimeoURL + videoID);
        
        const { playing, muted, loop, videoStatus } = this.state;
        
        return (
            <React.Fragment>
            <div className={"hero-controls" + videoStatus}>
                <button className="hero-playPause" onClick={this.handlePlayPause}>
                    <i className={playing ? "duotoneColors fad fa-pause-circle" : "duotoneColors fad fa-play-circle"}></i>
                </button>
                <i className="hero-thruster fas fa-spinner fa-spin"></i>
            </div>
            <div className={"embed-responsive embed-responsive-" + videoSize}>                
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