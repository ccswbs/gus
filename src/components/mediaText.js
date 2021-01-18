import PropTypes from 'prop-types';
import React from 'react';
import Img from 'gatsby-image';
import Video from '../components/video';
import { contentExists } from '../utils/ug-utils';

function MediaText (props) {
	
	if (contentExists(props.widgetData) && props.widgetData.length !==0) {
		
		return (props.widgetData.map((widget,i) => {			
			
			if (widget.__typename==="paragraph__media_text") {
				
				const mediaTitle = widget.field_media_text_title;
				const mediaDescription = widget.field_media_text_desc.processed;
				const mediaRelationships = widget.relationships.field_media_text_media.relationships;
				
				const videoURL = (contentExists(widget.relationships.field_media_text_media.field_media_oembed_video) ? widget.relationships.field_media_text_media.field_media_oembed_video : ``);
				
				const imageURL = (contentExists(mediaRelationships) && contentExists(mediaRelationships.field_media_image) ? mediaRelationships.field_media_image.localFile : ``);

				const videoTranscript = (contentExists(mediaRelationships) && contentExists(mediaRelationships.field_media_file) ? mediaRelationships.field_media_file.localFile.publicURL : ``);

				return (
					<>
					<div className="row row-with-vspace">
						<section className="col-md-6">
						{contentExists(videoURL) ?
						<Video playerID={i} videoURL={videoURL} videoTranscript={videoTranscript} />
						: ``}
						{contentExists(imageURL) ? <Img fluid={imageURL.childImageSharp.fluid} alt="placeholder" /> : ``}
						</section>
						<section className="col-md-6">
							<h3>{mediaTitle}</h3>
							<div dangerouslySetInnerHTML={{ __html: mediaDescription}} />
						</section>
					</div>
				</>)
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