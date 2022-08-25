import React from 'react';
import { GatsbyImage } from "gatsby-plugin-image";
import { graphql } from 'gatsby';
import PropTypes from "prop-types";
import { contentExists } from 'utils/ug-utils';
import 'styles/hero.css';

function Hero (props) {
	return (
        <React.Fragment>
			{contentExists(props.imgData) && props.imgData.length !== 0 && <>
				{props.imgData.map (img => {	
					let heroImage = img.node.relationships.field_media_image;
					let altText = img.node.field_media_image.alt;					
					return contentExists(heroImage) ? 
                        <React.Fragment key={img.node.drupal_id}>
                            <GatsbyImage image={heroImage.gatsbyImage} alt={altText} />
                        </React.Fragment>
                    : null;
				})}
			</>}
		</React.Fragment>
    );
}

Hero.propTypes = {
    imgData: PropTypes.array,
}
Hero.defaultProps = {
    imgData: null,
}
  
export default Hero

export const query = graphql`
	fragment HeroImageFragment on media__image {
		field_media_image {
			alt
		  }
		  relationships {
			field_media_image {
              publicUrl
              gatsbyImage(
                width: 1920
                cropFocus: CENTER
                placeholder: BLURRED
                aspectRatio: 3
              )
			}
			field_tags {
			  __typename
			  ... on TaxonomyInterface {
				name
			  }
			}
		  }
	}
`