import React from "react";
import { graphql, Link } from "gatsby";
import { GatsbyImage } from "gatsby-plugin-image";
import { getHeadingLevel, isExternalURL } from "../../utils/ug-utils";
import "styles/links.css";

function GridLink({ title, description, url, image, Heading }) {
  const isExternal = isExternalURL(url);
  const LinkTag = isExternal ? "a" : Link;

  return (
    <LinkTag className="link" href={isExternal ? url : undefined} to={isExternal ? undefined : url}>
      <GatsbyImage image={image} alt={title} className="link-image" imgClassName="link-image" />
      <div className="link-text">
        <Heading className="link-title">{title}</Heading>
        <p className="link-description">{description}</p>
      </div>
    </LinkTag>
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

export default Links;
