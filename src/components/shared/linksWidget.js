import Links from "./links";
import React from "react";

export const LinksWidget = ({ data }) => {
  const links = data.relationships?.field_link_items
    ?.map((link) =>
      link
        ? {
            id: link?.drupal_id,
            description: link?.field_link_description,
            title: link?.field_link_url?.title,
            url: link?.field_link_url?.url,
            image: link.relationships.field_link_image.relationships.field_media_image?.gatsbyImage || null,
          }
        : null
    )
    .filter(Boolean);

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
