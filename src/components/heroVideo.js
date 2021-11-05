import React, { Component } from 'react';
import ReactPlayer from 'react-player';
import PropTypes from 'prop-types';
import { contentExists } from '../utils/ug-utils';

class HeroVideo extends Component {
    
    state = {
        playing: true,
        muted: true,
        loop: true
    }
    
    ref = player => {
        this.player = player
    }
    handlePlayPause = () => {
        this.setState({ playing: !this.state.playing })
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
        
        const { playing, muted, loop } = this.state;
        
        return (
            <React.Fragment>        
            <div className={"embed-responsive embed-responsive-" + videoSize}>
            <button style="width:100px; position:absolute; top:10%; left:50%; transform:translate(-10%,-50%); background:#c20430; color:#fff; font-weight:bold; z-index:50;" onClick={this.handlePlayPause}>{playing ? 'Pause' : 'Play'}</button>
            <ReactPlayer
                ref={this.ref}
                url={videoSrc}
                playing={playing}
                loop={loop}
                muted={muted}
                width="100%"
                height="100%"
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