import PropTypes from 'prop-types';
import React from 'react';
import FooterSocial from './blocks/ovc/footer_social';
import { graphql } from 'gatsby';
import { GatsbyImage } from "gatsby-plugin-image";
import Widget from './widget';
import { contentExists } from '../utils/ug-utils';
import '../styles/customFooter.css';


function CustomFooter (props) {
	const footer = props.footerData;
  // check if footer is from OVC - set conditions so layout is sligtly different as well as include OVC social media
  var footerOVCCust = "no";
  var firstClassCol = "col-md-3 content-area";
  var secondClassCol = "col-md-9 content-area";
  footer.node.relationships.field_tags.forEach(element => {if (element.__typename === "taxonomy_term__units" && element.name.includes("Ontario Veterinary College"))
      footerOVCCust= "yes"
    });
  if (footerOVCCust === "yes") {
    firstClassCol = "col-md-4 content-area";
    secondClassCol = "col-md-8 content-area";
  }
	const footerLogos = (contentExists(footer.node.relationships.field_footer_logo) ? footer.node.relationships.field_footer_logo : null);
	const footerText = (contentExists(footer.node.body.processed) ? footer.node.body.processed : null);
	const footerWidgets = (contentExists(footer.node.relationships.field_widgets) ? footer.node.relationships.field_widgets : null);
		
	return <>	
		<div className="full-width-container bg-light pre-footer">
			<div className="container page-container">
				<section className="row row-with-vspace site-content">
					{contentExists(footerLogos) &&
					<div className={firstClassCol}>
					{footerLogos.map(logo => (
						<GatsbyImage
                            image={logo.relationships.field_media_image.localFile.childImageSharp.gatsbyImageData}
                            className="footer-logo"
                            alt={logo.field_media_image.alt} />
					))}
         {footerOVCCust === "yes" && FooterSocial()}
					</div>}
					<div className={secondClassCol}>
						<div className="container" dangerouslySetInnerHTML={{ __html: footerText}} />
						<Widget pageData={footerWidgets} />
					</div>
				</section>			
			</div>
		</div>
	</>;
}
		
CustomFooter.propTypes = {
    footerData: PropTypes.object,
}
CustomFooter.defaultProps = {
    footerData: null,
}

export default CustomFooter

export const query = graphql`
	fragment CustomFooterFragment on node__custom_footer {
		drupal_id
            body {
              processed
            }
            fields {
              tags
            }
            relationships {
              field_tags {
                __typename
                ... on taxonomy_term__units {
                  drupal_id
                  id
                  name
                }
              }

              field_footer_logo {
                field_media_image {
                  alt
                }
                relationships {
                  field_media_image {
                    localFile {
                      publicURL
                      childImageSharp {
                        gatsbyImageData(width: 400, placeholder: BLURRED, layout: CONSTRAINED)
                      }
                    }
                  }
                }
              }
              field_widgets {
                ...FieldWidgetsFragment
              }
            }
	}

`