import React from "react";
import { Link } from "gatsby";
import { GatsbyImage } from "gatsby-plugin-image";
import { getHeadingLevel, isExternalURL } from "../../utils/ug-utils";
import "styles/links.css";

function LinkElement(props) {
  const url = props.url;

  return isExternalURL(url) ? (
    <a {...props} href={url}>
      {props.children}
    </a>
  ) : (
    <Link {...props} to={url}>
      {props.children}
    </Link>
  );
}

function GridLink({ title, url, image, Heading }) {
  return (
    <LinkElement className="link-element link-grid-item" url={url}>
      <GatsbyImage image={image} alt={title} className="link-image" imgClassName="link-image" />
      <Heading className="link-title h4">{title}</Heading>
    </LinkElement>
  );
}

function ListLink({ title, url }) {
  return (
    <li>
      <LinkElement url={url}>
        <span>{title}</span>
      </LinkElement>
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
      {description && <p className="links-description">{description}</p>}

      <LinksInner className="links-inner">
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
