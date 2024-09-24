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
    <a {...copyProps} href={url}>
      {copyProps.children}
    </a>
  ) : (
    <Link {...copyProps} to={url}>
      {copyProps.children}
    </Link>
  );
}

function GridLink({ title, url, image }) {
  return (
    <LinkElement className={styles.link} url={url}>
      <GatsbyImage image={image} alt="" />
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
  const numLinks = links.length;
  // const LinkHeading = title ? getHeadingLevel(headingLevel, 1) : "p";
  const LinksInner = isGrid ? "div" : "ul";

  return (
    <div className={styles.outer}>
      {title && <Heading>{title}</Heading>}
      {description && <p>{description}</p>}

      <LinksInner className={`${styles.inner} ${(numLinks === 2 || numLinks === 3) && styles.twoOrThree}`}>
        {links.map((link) => {
          const { id, title, url, image } = link;

          return isGrid ? (
            <GridLink key={id} title={title} url={url} image={image} />
          ) : (
            <ListLink key={id} title={title} url={url} />
          );
        })}
      </LinksInner>
    </div>
  );
}

export default Links;
