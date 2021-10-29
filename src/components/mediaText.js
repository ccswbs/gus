import PropTypes from 'prop-types';
import React from 'react';
import { GatsbyImage } from "gatsby-plugin-image";
import Video from '../components/video';
import { Link } from 'gatsby';
import SectionButtons from '../components/sectionButtons';
import { contentExists } from '../utils/ug-utils';

function MediaText (props) {

	const aliasData = require('../../config/aliases/aliasfile.yml');

	const mediaTitle = (contentExists(props.widgetData.field_media_text_title) ? '<h3>' + props.widgetData.field_media_text_title + '</h3>': ``);
	const mediaDescription = (contentExists(props.widgetData.field_media_text_desc) ? props.widgetData.field_media_text_desc.processed: ``);
	const mediaLinks = props.widgetData.field_media_text_links;	
	const mediaRelationships = (contentExists(props.widgetData.relationships.field_media_text_media) ? props.widgetData.relationships.field_media_text_media.relationships: ``);
	
	const imageURL = (contentExists(mediaRelationships) && contentExists(mediaRelationships.field_media_image) ? mediaRelationships.field_media_image.localFile : ``);	
	const imageAlt = (contentExists(props.widgetData.relationships.field_media_text_media.field_media_image) ? props.widgetData.relationships.field_media_text_media.field_media_image.alt : ``);
	
	const videoURL = (contentExists(mediaRelationships) ? props.widgetData.relationships.field_media_text_media.field_media_oembed_video : ``);
	const videoTranscript = (contentExists(mediaRelationships) && contentExists(mediaRelationships.field_media_file) ? mediaRelationships.field_media_file.localFile.publicURL : ``);
	const videoCC = (contentExists(mediaRelationships) && contentExists(mediaRelationships.field_video_cc) ? mediaRelationships.field_video_cc.localFile.publicURL : ``);
	
	return <>	

			<section className={props.colClass}>
			{contentExists(videoURL) ?
			<Video playerID={props.widgetData.drupal_id} videoURL={videoURL} videoTranscript={videoTranscript} videoCC={videoCC} />
			: ``}
			{contentExists(imageURL) ? <GatsbyImage image={imageURL.childImageSharp.gatsbyImageData} alt={imageAlt} /> : ``}
			</section>
			<section className={props.colClass}>
				<div dangerouslySetInnerHTML={{ __html: mediaTitle}} />
				<div dangerouslySetInnerHTML={{ __html: mediaDescription}} />
				{contentExists(props.widgetData.relationships.field_button_section) === true &&<SectionButtons pageData={props.widgetData.relationships.field_button_section} />}
				{contentExists(props.widgetData.relationships.field_button_section) === false && <div>{mediaLinks.map(mediaLink => {
// set the link to the url provided, if internal Drupal link (entity or internal) - clean up the URI to work with Link command,
// to handel a <noLink>, if external link pass through, otherwise set to null
				const  urlLink= (contentExists(mediaLink.uri)) ? (mediaLink.uri.includes("entity:node/")) ?
				aliasData[mediaLink.uri.replace("entity:node/","")]: (mediaLink.uri.includes("internal:/")) ? ("/") :
				(mediaLink.uri.includes("<nolink>")) ? null : mediaLink.uri : null ;	
					return ( 
					<React.Fragment>
						{(mediaLink.uri.includes("http"))? <><a className="btn btn-outline-info" href={urlLink}>{mediaLink.title}</a> </> :
						<Link to={urlLink} className="btn btn-outline-info" >{mediaLink.title}</Link>}
					</React.Fragment>)
					
				})}</div>}
			</section>
		
	</>;
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