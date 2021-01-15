import PropTypes from 'prop-types';
import React from 'react';
import Video from '../components/video';
import { contentExists } from '../utils/ug-utils';

function MediaText (props) {
	
	if (contentExists(props.widgetData) && props.widgetData.length !==0) {
		
		return (props.widgetData.map((widget,i) => {			
			
			if (widget.__typename==="paragraph__media_text") {
				
				const mediaTitle = widget.field_media_text_title;
				const mediaDescription = widget.field_media_text_desc.processed;
				const mediaRelationships = widget.relationships.field_media_text_media.relationships;
				const playerID = i;
				
				const videoURL = (contentExists(widget.relationships.field_media_text_media.field_media_oembed_video) ? widget.relationships.field_media_text_media.field_media_oembed_video : ``);
				
				const imageURL = (contentExists(mediaRelationships) && contentExists(mediaRelationships.field_media_image) ? mediaRelationships.field_media_image.localFile.url : ``);

				const videoTranscript = (contentExists(mediaRelationships) && contentExists(mediaRelationships.field_media_file) ? mediaRelationships.field_media_file.localFile.publicURL : ``);			
		
				if (contentExists(videoURL)) {
					
					const videoID = videoURL.substr(videoURL.length - 11);					
					return (<>
					<h2>Video {mediaTitle} Exists</h2>
					<Video playerID={i} videoSrc={videoID} videoTitle={mediaTitle} />
					<p>Video URL is {videoURL} and video ID is {videoID} and video transcript is {videoTranscript}</p>
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