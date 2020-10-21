import React from 'react'
import Img from 'gatsby-image';
import PropTypes from "prop-types"
import { contentIsNullOrEmpty } from '../utils/ug-utils';

function Hero ({ imageData }) {
	let checkIfContentAvailable = false;
	
	if (!contentIsNullOrEmpty(imageData)) {
		checkIfContentAvailable = true;
	}
	
	if (checkIfContentAvailable === true) {
		let heroImage = imageData.relationships.field_media_image;
		let altText = imageData.field_media_image.alt;

		return <React.Fragment><Img fluid={heroImage.localFile.childImageSharp.fluid} alt={altText} /></React.Fragment>
	}
	
	return null;
}

Hero.propTypes = {
    imageData: PropTypes.array,
}
Hero.defaultProps = {
    imageData: null,
}
  
export default Hero