import PropTypes from "prop-types";
import React from "react";
import { graphql } from "gatsby";
import { GatsbyImage } from "gatsby-plugin-image";
import { contentExists, setHeadingLevel } from "../../utils/ug-utils";
import "styles/list.css";

function Links({ data, type, title, headingLevel, description, columns }) {
  return (
    <>
      <div>{title}</div>
    </>
  );
}

Links.propTypes = {
  data: PropTypes.array,
  type: PropTypes.string,
  title: PropTypes.string,
  headingLevel: PropTypes.string,
  description: PropTypes.string,
  columns: PropTypes.number,
};

Links.defaultProps = {
  data: "",
  type: "list",
  title: "",
  headingLevel: "h2",
  description: "",
  columns: 4,
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
