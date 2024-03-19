import React from "react";
import { Link } from "gatsby";
import { GatsbyImage } from "gatsby-plugin-image";
import { getHeadingLevel, isExternalURL } from "../../utils/ug-utils";
import "styles/links.css";

function LinkElement(props) {
  const url = props.url;

  // Remove url from props to avoid passing it to the anchor or Gatsby Link
  const copyProps = { ...props };
  delete copyProps.url;

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

function GridLink({ title, url, image, alt, Heading }) {
  return (
    <LinkElement className="link-element link-grid-item" url={url}>
      <GatsbyImage image={image} alt={alt} className="link-image" />
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
  const LinkHeading = title ? getHeadingLevel(headingLevel, 1) : "p";
  const LinksInner = isGrid ? "div" : "ul";

  return (
    <div className="links-outer">
      {title && <Heading className="links-heading">{title}</Heading>}
      {description && <p className="links-description">{description}</p>}

      <LinksInner className="links-inner">
        {links.map((link) => {
          const { id, title, description, url, image, alt } = link;

          return isGrid ? (
            <GridLink key={id} title={title} description={description} url={url} image={image} alt={alt} Heading={LinkHeading} />
          ) : (
            <ListLink key={id} title={title} description={description} url={url} Heading={LinkHeading} />
          );
        })}
      </LinksInner>
    </div>
  );
}

export default Links;
