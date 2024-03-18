import PropTypes from "prop-types";
import React from "react";
import { graphql, Link } from "gatsby";
import { GatsbyImage } from "gatsby-plugin-image";
import { getHeadingLevel, isExternalURL } from "../../utils/ug-utils";
import "styles/list.css";

function GridLink({ title, description, url, image, Heading }) {
  const isExternal = isExternalURL(url);
  const LinkTag = isExternal ? "a" : Link;

  return (
    <Link className="link" href={isExternal ? url : undefined} to={isExternalURL ? undefined : url}>
      <GatsbyImage image={image} alt={title} className="link-image" imgClassName="link-image" />
      <div className="link-text">
        <Heading className="link-title">{title}</Heading>
        <p className="link-description">{description}</p>
      </div>
    </Link>
  );
}

function ListLink({ title, description, url, Heading }) {
  return (
    <li>
      <a href={url}>
        <Heading>{title}</Heading>
        <p>{description}</p>
      </a>
    </li>
  );
}

function Links({ links = [], title, headingLevel, description }) {
  const isGrid = links?.some((item) => item.image);
  const Heading = getHeadingLevel(headingLevel);
  const LinkHeading = getHeadingLevel(headingLevel, 1);
  const LinksInner = isGrid ? "div" : "ul";

  return (
    <div className="links-outer">
      {title && <Heading className="links-heading">{title}</Heading>}

      <LinksInner className="links-inner">
        {description && <p className="links-description">{description}</p>}

        {links.map((link) => {
          const { id, title, description, url, image } = link;

          return isGrid ? (
            <GridLink key={id} title={title} description={description} url={url} image={image} Heading={LinkHeading} />
          ) : (
            <ListLink key={id} title={title} description={description} url={url} Heading={LinkHeading} />
          );
        })}
      </LinksInner>
    </div>
  );
}

Links.propTypes = {
  links: PropTypes.array,
  title: PropTypes.string,
  headingLevel: PropTypes.string,
  description: PropTypes.string,
};

Links.defaultProps = {
  links: [],
  title: "",
  headingLevel: "h2",
  description: "",
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
