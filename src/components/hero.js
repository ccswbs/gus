import React from 'react'
import Img from 'gatsby-image';
import PropTypes from "prop-types"
import { contentIsNullOrEmpty } from '../utils/ug-utils';
import "../styles/hero.css"

function Hero (props) {
	return (
		<React.Fragment>
			{!contentIsNullOrEmpty(props.imgData) && props.imgData.length !== 0 && <>
				{props.imgData.map (img => {	
					let heroImage = img.node.relationships.field_media_image.localFile;
					let altText = img.node.field_media_image.alt;					
					return <React.Fragment><Img fluid={heroImage.childImageSharp.fluid} alt={altText} /></React.Fragment>
				})}
			</>}
		</React.Fragment>
	)
}

Hero.propTypes = {
    imgData: PropTypes.array,
}
Hero.defaultProps = {
    imgData: null,
}
  
export default Hero