import React from "react";
import Links from "./links";
import { graphql } from "gatsby";

export const LinksWidget = ({ data }) => {
  console.log(data);

  const links = data.relationships?.field_link_items
    ?.map((link) =>
      link
        ? {
            id: link?.drupal_id,
            title: link?.field_link_url?.title,
            url: link?.field_link_url?.url,
            image: link?.relationships?.field_link_image?.relationships?.field_media_image?.gatsbyImage || null,
            alt: link?.relationships?.field_link_image?.field_media_image?.alt || "",
          }
        : null
    )
    .filter(Boolean);

  console.log(links);

  return (
    <Links
      key={data.drupal_id}
      links={links || []}
      title={data.field_link_items_title}
      headingLevel={"h2"}
      description={data.field_link_items_description}
    />
  );
};

export default LinksWidget;

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
            field_media_image {
              alt
            }
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
