import PropTypes from 'prop-types';
import React from 'react';
import Video from '../components/video';
import { contentExists } from '../utils/ug-utils';

function MediaText (props) {
	
	if (contentExists(props.widgetData) && props.widgetData.length !==0) {
		
		return (props.widgetData.map(mediatext => {			
			
			if (mediatext.__typename==="paragraph__media_text") {
				
				const mediaTitle = mediatext.field_media_text_title;
				const imageURL = (mediatext.relationships.field_media_text_media.relationships !== undefined ? mediatext.relationships.field_media_text_media.relationships.field_media_image.localFile.url : ``);
				
				if (contentExists(mediatext.relationships.field_media_text_media.field_media_oembed_video)) {
					
					const videoURL = mediatext.relationships.field_media_text_media.field_media_oembed_video;
					const videoID = videoURL.substr(videoURL.length - 11);
					
					return (<>
					<h2>Video {mediaTitle} Exists</h2>
					<Video videoSrc={videoID} videoTitle={mediaTitle} />
					<p>Video URL is {videoURL} and video ID is {videoID}</p>
					</>)
					
				} else if (contentExists(imageURL)) {					
					return <><h2>Image {mediaTitle} Exists:</h2><p>{imageURL}</p></>					
				}
			} 
			return null;     
		}))     
	}
	return null;
}

MediaText.propTypes = {
    widgetData: PropTypes.array,   
}
MediaText.defaultProps = {
    widgetData: null,
}

export default MediaText