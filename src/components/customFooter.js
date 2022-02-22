import PropTypes from 'prop-types';
import React from 'react';
import { graphql } from 'gatsby';
import { GatsbyImage } from "gatsby-plugin-image";
import Widget from './widget';
import { contentExists } from '../utils/ug-utils';
import '../styles/customFooter.css';
// Social icons
import {
  FaInstagram,
  FaFacebookSquare,
  FaTwitterSquare,
  FaLinkedin,
  FaYoutubeSquare
} from 'react-icons/fa';

function CustomFooter (props) {
	const footer = props.footerData;
  var footerOVCCust = "no";
  var firstClassCol = "col-md-3 content-area";
  var secondClassCol = "col-md-9 content-area";
  console.log(footerOVCCust);
  console.log(footer.node.relationships.field_tags);
  footer.node.relationships.field_tags.forEach(element => {if (element.__typename === "taxonomy_term__units" && element.name.includes("Ontario Veterinary College"))
      footerOVCCust= "yes"
    });
console.log(footerOVCCust);
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
         {footerOVCCust === "yes" &&
          <div>
            <h4 className="mt-4 text-dark">Stay Connected</h4>
            <a href="https://instagram.com/ontvetcollege/" className="text-dark">
              <span className="sr-only">Connect with OVC on Instagram</span>
              <FaInstagram style={{fontSize: "4.8rem"}}/>
            </a>
            <a href="https://www.linkedin.com/school/ontario-veterinary-college/" className="text-dark">
              <span className="sr-only">Connect with OVC on LinkedIn</span>
              <FaLinkedin style={{fontSize: "4.8rem"}}/>
            </a>
            <a href="http://www.facebook.com/ontvetcollege" className="text-dark">
              <span className="sr-only">Connect with OVC on Facebook</span>
              <FaFacebookSquare style={{fontSize: "4.8rem"}} />
            </a>
            <a href="http://twitter.com/OntVetCollege/" className="text-dark">
              <span className="sr-only">Connect with OVC on Twitter</span>
              <FaTwitterSquare style={{fontSize: "4.8rem"}} />
            </a>
            <a href="http://www.youtube.com/user/OntarioVetCollege" className="text-dark">
              <span className="sr-only">Connect with OVC on YouTube</span>
              <FaYoutubeSquare style={{fontSize: "4.8rem"}} />
            </a>
          </div>}
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