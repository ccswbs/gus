import React from "react";
import { Parser, ProcessNodeDefinitions } from "html-to-react";
import { graphql, useStaticQuery, Script } from "gatsby";

const AnchorTag = ({ node, children }) => {
  const urlData = useStaticQuery(graphql`
    query {
      sitePlugin(name: { eq: "gatsby-source-drupal" }) {
        pluginOptions
      }
    }
  `);
  const baseUrl = urlData.sitePlugin.pluginOptions.baseUrl.endsWith("/")
    ? urlData.sitePlugin.pluginOptions.baseUrl.slice(0, -1)
    : urlData.sitePlugin.pluginOptions.baseUrl;

  let newAttribs = { ...node.attribs };

  // If href points to a media file, prepend baseUrl
  if (newAttribs && newAttribs.href && newAttribs["data-entity-type"] === "media") {
    newAttribs.href = baseUrl + newAttribs.href;
  }

  // Remove any data-entity or style attributes
  for (let attr in newAttribs) {
    if (attr.startsWith("data-entity") || attr.startsWith("style")) {
      delete newAttribs[attr];
    }
  }

  return <a {...newAttribs}>{children}</a>;
};

function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max);
}

const ConditionalWrapper = ({ condition, wrapper, children }) => (condition ? wrapper(children) : children);

// Source: https://flaviocopes.com/how-to-divide-array-js/
function divideIntoColumns(data, numColumns) {
  let dividedData = [];
  let itemsPerRow = Math.ceil(data.length / numColumns);

  for (let i = 0; i < numColumns; i++) {
    dividedData.push([]);
  }

  for (let row = 0; row < numColumns; row++) {
    for (let i = 0; i < itemsPerRow; i++) {
      const value = data[i + row * itemsPerRow];
      if (!value) continue; //avoid adding "undefined" values
      dividedData[row].push(value);
    }
  }

  return dividedData;
}

// Source: https://www.labnol.org/code/19797-regex-youtube-id
function extractVideoID(url) {
  let regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#]*).*/;
  let match = url.match(regExp);

  if (match) {
    return match[7].split("?")[0];
  } else {
    console.log("Could not extract video ID.");
  }
}

function fontAwesomeIconColour(colourChoice) {
  switch (colourChoice) {
    case "Yellow":
      return "uog-yellow";
    case "Red":
      return "uog-red";
    case "Darker Red":
      return "uog-red-darker";
    default:
      return "";
  }
}

function getHeadingLevel(headingLevel, shift = 0) {
  const parsed = headingLevel.match(/^[Hh](\d)$/i)?.[1];
  const level = clamp((Number.parseInt(parsed) || 0) + shift, 0, 6);

  return level === 0 ? "p" : `h${level}`;
}

function getNextHeadingLevel(headingLevel) {
  let level = parseInt(headingLevel.replace(/[^\d.]/g, "")) + 1;
  let nextHeadingLevel = setHeadingLevel("h" + level);
  return nextHeadingLevel;
}

function isExternalURL(url) {
  const includesProtocol = url.includes("http");

  if (typeof window !== "undefined" && includesProtocol) {
    return new URL(url).origin !== window.location?.origin;
  }

  return includesProtocol;
}

const ParseText = ({ textContent }) => {
  const parser = new Parser();
  const instructions = [
    {
      // Replace <script> tags with Gatsby <Script> components
      shouldProcessNode: (node) => node.name === "script" && node.attribs?.src,
      processNode: (node) => <Script src={node.attribs.src} />,
    },
    {
      // Inline scripts will also be replaced but should only have one child, which is the script text
      shouldProcessNode: (node) => node.name === "script" && node?.children.length === 1,
      processNode: (node) => <Script>{node.children[0].data}</Script>,
    },
    {
      // Process anchor tags to prepend baseUrl and remove data-entity attributes
      shouldProcessNode: (node) => node.name === "a",
      processNode: (node, children) => <AnchorTag node={node} children={children} />,
    },
    {
      // Process all other nodes with the default parser
      shouldProcessNode: () => true,
      processNode: new ProcessNodeDefinitions().processDefaultNode,
    },
  ];
  return parser.parseWithInstructions(textContent, () => true, instructions);
};

function setHeadingLevel(headingLevel) {
  // console.log(headingLevel, "setHeadingLevel")
  const validHeadingLevels = ["h1", "h2", "h3", "h4", "h5", "h6"];
  const safeHeading = headingLevel ? headingLevel.toLowerCase() : "";
  const selectedHeading = validHeadingLevels.includes(safeHeading) ? safeHeading : "p";
  return selectedHeading;
}

function slugify(string) {
  const a = "àáâäæãåāăąçćčđďèéêëēėęěğǵḧîïíīįìłḿñńǹňôöòóœøōõőṕŕřßśšşșťțûüùúūǘůűųẃẍÿýžźż·/_,:;";
  const b = "aaaaaaaaaacccddeeeeeeeegghiiiiiilmnnnnoooooooooprrsssssttuuuuuuuuuwxyyzzz------";
  const p = new RegExp(a.split("").join("|"), "g");

  return string
    .toString()
    .toLowerCase()
    .replace(/\s+/g, "-") // Replace spaces with -
    .replace(p, (c) => b.charAt(a.indexOf(c))) // Replace special characters
    .replace(/&/g, "-and-") // Replace & with 'and'
    .replace(/[^\w-]+/g, "") // Remove all non-word characters
    .replace(/--+/g, "-") // Replace multiple - with single -
    .replace(/^-+/, "") // Trim - from start of text
    .replace(/-+$/, ""); // Trim - from end of text
}

function sortLastModifiedDates(dates) {
  return dates.slice().flat().sort();
}

function stripHTMLTags(content) {
  return content !== null ? content.replace(/(<([^>]+)>)/gi, "") : ``;
}

export {
  AnchorTag,
  clamp,
  ConditionalWrapper,
  divideIntoColumns,
  extractVideoID,
  fontAwesomeIconColour,
  getHeadingLevel,
  getNextHeadingLevel,
  isExternalURL,
  ParseText,
  setHeadingLevel,
  slugify,
  sortLastModifiedDates,
  stripHTMLTags,
};
