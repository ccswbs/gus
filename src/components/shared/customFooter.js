import PropTypes from 'prop-types';
import React, { lazy, Suspense } from "react";
import { graphql } from 'gatsby';
import { GatsbyImage } from "gatsby-plugin-image";
import Widget from 'components/shared/widget';
import { ParseText } from "utils/ug-utils"
import 'styles/customFooter.css';

const OVCCustomFooter = lazy(() => import('components/blocks/ovc/footerOVC'));

function chooseFooter (footer) {
  let footerSelection = ``;
  footer.node.relationships?.field_tags.forEach(
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
      {logos &&
        <div className="col-md-3 content-area">
          {logos.map(logo => (
            <GatsbyImage
              key={`footer-logo-${logo.field_footer_logo?.drupal_id}`}
              image={logo.relationships?.field_media_image?.gatsbyImage}
              className="footer-logo"
              alt={logo.field_media_image?.alt} />
          ))}
        </div>}
      <div className="col-md-9 content-area">
        <div className="container">
          <ParseText textContent={text} />
        </div>
        <Widget data={widgets} />
      </div>
    </section>			
  </div>
</div>
)

const CustomFooter = (props) => {
  const footer = props.footerData;
	const footerLogos = footer.node.relationships?.field_footer_logo ? footer.node.relationships.field_footer_logo : null;
	const footerText = footer.node.body?.processed ? footer.node.body.processed : null;
	const footerWidgets = footer.node.relationships?.field_widgets ? footer.node.relationships.field_widgets : null;

  switch (chooseFooter(footer)) {
    case "OVC":
      return (
        <Suspense fallback={<></>}>
          <OVCCustomFooter footerData={footer} />
        </Suspense>
      )
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
        drupal_id
        field_media_image {
          alt
        }
        relationships {
          field_media_image {
            publicUrl
            gatsbyImage(width: 400, placeholder: BLURRED, layout: CONSTRAINED, formats: [AUTO, WEBP])
          }
        }
      }
      field_widgets {
        ...FieldWidgetsFragment
      }
    }
	}
`