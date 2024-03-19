import React from "react";
import { Link } from "gatsby";
import { GatsbyImage } from "gatsby-plugin-image";
import { getHeadingLevel, isExternalURL } from "../../utils/ug-utils";
import * as styles from "styles/links.module.css";

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

function GridLink({ title, url, image, alt }) {
  return (
    <LinkElement className={styles.link} url={url}>
      <GatsbyImage image={image} alt={alt} />
      <span className={`${styles.title} h4`}>{title}</span>
    </LinkElement>
  );
}

function ListLink({ title, url }) {
  return (
    <li>
      <LinkElement className={styles.link} url={url}>
        <span>{title}</span>
      </LinkElement>
    </li>
  );
}

function Links({ links = [], title, headingLevel, description }) {
  const isGrid = links?.some((item) => item.image);
  const Heading = getHeadingLevel(headingLevel);
  // const LinkHeading = title ? getHeadingLevel(headingLevel, 1) : "p";
  const LinksInner = isGrid ? "div" : "ul";

  return (
    <div className={styles.outer}>
      {title && <Heading>{title}</Heading>}
      {description && <p>{description}</p>}

      <LinksInner className={styles.inner}>
        {links.map((link) => {
          const { id, title, url, image, alt } = link;

          return isGrid ? (
            <GridLink key={id} title={title} url={url} image={image} alt={alt} />
          ) : (
            <ListLink key={id} title={title} url={url} />
          );
        })}
      </LinksInner>
    </div>
  );
}

export default Links;
