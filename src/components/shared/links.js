import PropTypes from "prop-types";
import React from "react";
import { graphql } from "gatsby";
import { GatsbyImage } from "gatsby-plugin-image";
import LinksElement from "components/shared/linksElement";
import {contentExists, setHeadingLevel} from "../../utils/ug-utils";
import "styles/list.css";

function LinksOuter(props) {
  const setBackGroundClass = props.displayType === "grid" ? "grid" : "row list";

  let Heading = setHeadingLevel(props.headingLevel);
  if (contentExists(props.children)) {
    return (
      <div className={setBackGroundClass}>
        <div className="col-md-12">
          {contentExists(props.heading) && <Heading>{props.heading}</Heading>}
          {contentExists(props.description) && <p>{props.description}</p>}
          {props.displayType === "grid" ? <div className="row g-5">{props.children}</div> : <ul>{props.children}</ul>}
        </div>
      </div>
    );
  } else {
    return null;
  }
}

LinksOuter.propTypes = {
  children: PropTypes.node.isRequired,
  columnClass: PropTypes.string,
  heading: PropTypes.string,
  headingLevel: PropTypes.string,
  description: PropTypes.string,
  displayType: PropTypes.string,
};
LinksOuter.defaultProps = {
  children: ``,
  columnClass: "",
  heading: ``,
  headingLevel: ``,
  description: ``,
  displayType: `grid`,
};

function Links(props) {
  if (Array.isArray(props.pageData) && props.pageData.length !== 0) {
    return (
      <React.Fragment>
        <LinksOuter
          key={props.pageData.drupal_id}
          heading={props.heading}
          headingLevel={props.headingLevel}
          description={props.description}
          displayType={props.displayType}
        >
          {props.pageData.map((paragraph) => {
            if (paragraph.relationships) {
              // if images exists - set the images to use in the grid display
              const image = paragraph.relationships?.field_link_image
                ? paragraph.relationships.field_link_image.relationships.field_media_image
                : null;
              const imageFile = image && image.gatsbyImage ? <GatsbyImage image={image.gatsbyImage} alt="" /> : null;

              const urlLink = paragraph.field_link_url?.url ? paragraph.field_link_url.url : null;

              // set heading level to one lower based on the heading level of the header, if header does not exists set to h2
              const nextHeadingLevel =
                props.displayType === "grid"
                  ? props?.heading
                    ? props.headingLevel === "h2"
                      ? "h3"
                      : props.headingLevel === "h3"
                        ? "h4"
                        : "h5"
                    : "h2"
                  : "";
              const setTag = props.displayType === "list" ? "li" : "div";
              return (
                <LinksElement
                  key={paragraph.drupal_id}
                  url={urlLink}
                  image={imageFile}
                  headingLink={paragraph.field_link_url.title}
                  headingLinkLevel={nextHeadingLevel}
                  numColumns={props.numColumns}
                  displayType={props.displayType}
                  tag={setTag}
                />
              );
            }
            return null;
          })}
        </LinksOuter>
      </React.Fragment>
    );
  }
  return null;
}

Links.propTypes = {
  pageData: PropTypes.array,
  displayType: PropTypes.string,
  heading: PropTypes.string,
  headingLevel: PropTypes.string,
  description: PropTypes.string,
  numColumns: PropTypes.number,
};

Links.defaultProps = {
  pageData: ``,
  displayType: `list`,
  heading: ``,
  headingLevel: `h2`,
  description: ``,
  numColumns: 4,
};

export default Links;

export const query = graphql`
  fragment LinksWidgetParagraphFragment on paragraph__links_widget {
    drupal_id
    field_link_items_title
    field_link_items_description
    relationships {
      field_link_items {
        drupal_id
        field_link_description
        field_link_url {
          title
          uri
          url
        }
        relationships {
          field_link_image {
            relationships {
              field_media_image {
                gatsbyImage(width: 800, height: 600, cropFocus: CENTER, formats: [AUTO, WEBP])
              }
            }
          }
        }
      }
    }
  }
`;
