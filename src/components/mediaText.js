import PropTypes from 'prop-types';
import React from 'react';
import Img from 'gatsby-image';
import Video from '../components/video';
import { contentExists } from '../utils/ug-utils';

function MediaText (props) {
	
	const mediaTitle = props.widgetData.field_media_text_title;
	const mediaDescription = props.widgetData.field_media_text_desc.processed;
	const mediaLinks = props.widgetData.field_media_text_links;
	const mediaRelationships = (contentExists(props.widgetData.relationships.field_media_text_media) ? props.widgetData.relationships.field_media_text_media.relationships: ``);
	
	const imageURL = (contentExists(mediaRelationships) && contentExists(mediaRelationships.field_media_image) ? mediaRelationships.field_media_image.localFile : ``);	
	const imageAlt = (contentExists(mediaRelationships) && contentExists(mediaRelationships.field_media_image) ? mediaRelationships.field_media_image.alt : ``);
	
	const videoURL = (contentExists(mediaRelationships) ? props.widgetData.relationships.field_media_text_media.field_media_oembed_video : ``);
	const videoTranscript = (contentExists(mediaRelationships) && contentExists(mediaRelationships.field_media_file) ? mediaRelationships.field_media_file.localFile.publicURL : ``);
	
	return (<>	

			<section className={props.colClass}>
			{contentExists(videoURL) ?
			<Video playerID={props.widgetData.drupal_id} videoURL={videoURL} videoTranscript={videoTranscript} />
			: ``}
			{contentExists(imageURL) ? <Img fluid={imageURL.childImageSharp.fluid} alt={imageAlt} /> : ``}
			</section>
			<section className={props.colClass}>
				<h2>{mediaTitle}</h2>
				<div dangerouslySetInnerHTML={{ __html: mediaDescription}} />
				<div>{mediaLinks.map(mediaLink => {
					return <><a className="btn btn-outline-info" href={mediaLink.uri}>{mediaLink.title}</a> </>
				})}</div>
			</section>
		
	</>)
}

MediaText.propTypes = {
    widgetData: PropTypes.object,
	colClass: PropTypes.string,
}
MediaText.defaultProps = {
    widgetData: null,
	colClass: `col-md-6`,
}

export default MediaText