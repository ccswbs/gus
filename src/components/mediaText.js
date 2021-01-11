import PropTypes from 'prop-types';
import React from 'react';
import { contentExists } from '../utils/ug-utils';

function MediaText (props) {
	
	if (contentExists(props.widgetData) && props.widgetData.length !==0) {
		
		return (props.widgetData.map(mediatext => {			
			if (mediatext.__typename==="paragraph__media_text") {
				
				const mediaTitle = mediatext.field_media_text_title;
				const videoURL = mediatext.relationships.field_media_text_media.field_media_oembed_video;
				const imageURL = (mediatext.relationships.field_media_text_media.relationships !== undefined ? mediatext.relationships.field_media_text_media.relationships.field_media_image.localFile.url : ``);

				return <><div>{mediaTitle} {videoURL !== null ? videoURL : ``} {imageURL}</div></>
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
