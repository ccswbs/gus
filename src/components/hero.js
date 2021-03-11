import React from 'react';
import Img from 'gatsby-image';
import PropTypes from "prop-types";
import { contentExists } from '../utils/ug-utils';
import '../styles/hero.css';

function Hero (props) {
	return (
		<React.Fragment>
			{contentExists(props.imgData) && props.imgData.length !== 0 && <>
				{props.imgData.map (img => {	
					let heroImage = img.node.relationships.field_media_image.localFile;
					let altText = img.node.field_media_image.alt;					
					return (
						contentExists(heroImage) ? 
							<React.Fragment key={img.node.drupal_id}>
								<Img fluid={heroImage.childImageSharp.fluid} alt={altText} />
							</React.Fragment>
						: null
					)
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