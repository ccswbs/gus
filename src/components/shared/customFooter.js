import PropTypes from 'prop-types';
import React from 'react';
import { graphql } from 'gatsby';
import { GatsbyImage } from "gatsby-plugin-image";
import OVCCustomFooter from 'components/blocks/ovc/footerOVC';
import Widget from 'components/shared/widget';
import { contentExists } from 'utils/ug-utils';
import 'styles/customFooter.css';

function chooseFooter (footer) {
  let footerSelection = ``;
  footer.node.relationships.field_tags.forEach(
    tag => {
      if(tag.__typename === "taxonomy_term__units" && 
        tag.name.includes("Ontario Veterinary College")){
          footerSelection = "OVC";
      }
    }
  )
  return footerSelection;
}

const DefaultFooter = ({logos, text, widgets}) => (
  <div className="full-width-container bg-light pre-footer">
  <div className="container page-container">
    <section className="row row-with-vspace site-content">
      {contentExists(logos) &&
      <div className="col-md-3 content-area">
      {logos.map(logo => (
        <GatsbyImage
          image={logo.relationships.field_media_image.gatsbyImage}
          className="footer-logo"
          alt={logo.field_media_image.alt} />
      ))}
      </div>}
      <div className="col-md-9 content-area">
        <div className="container" dangerouslySetInnerHTML={{ __html: text}} />
        <Widget pageData={widgets} />
      </div>
    </section>			
  </div>
</div>
)

const CustomFooter = (props) => {
  const footer = props.footerData;
	const footerLogos = (contentExists(footer.node.relationships.field_footer_logo) ? footer.node.relationships.field_footer_logo : null);
	const footerText = (contentExists(footer.node.body.processed) ? footer.node.body.processed : null);
	const footerWidgets = (contentExists(footer.node.relationships.field_widgets) ? footer.node.relationships.field_widgets : null);

  switch (chooseFooter(footer)) {
    case "OVC":
      return <OVCCustomFooter footerData={footer} />
    default:
      return <DefaultFooter
              logos={footerLogos} 
              text={footerText} 
              widgets={footerWidgets} />
  }
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
            publicUrl
            gatsbyImage(width: 400, placeholder: BLURRED, layout: CONSTRAINED)
          }
        }
      }
      field_widgets {
        ...FieldWidgetsFragment
      }
    }
	}
`