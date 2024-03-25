import React from "react";
import { graphql, useStaticQuery } from "gatsby";

//Unnecessary function - this can be deleted once we eliminate all calls to it
function contentExists(content) {
  if (content && !Array.isArray(content)) {
    return true;
  } else if (content && Array.isArray(content) && content.length > 0) {
    return true;
  }
  return false;
}

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

  // Remove any data-entity attributes
  for (let attr in newAttribs) {
    if (attr.startsWith("data-entity")) {
      delete newAttribs[attr];
    }
  }

  return <a {...newAttribs}>{children}</a>;
};

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

function getNextHeadingLevel(headingLevel) {
  let level = parseInt(headingLevel.replace(/[^\d.]/g, "")) + 1;
  let nextHeadingLevel = setHeadingLevel("h" + level);
  return nextHeadingLevel;
}

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
  contentExists,
  AnchorTag,
  ConditionalWrapper,
  divideIntoColumns,
  extractVideoID,
  fontAwesomeIconColour,
  getNextHeadingLevel,
  setHeadingLevel,
  slugify,
  sortLastModifiedDates,
  stripHTMLTags,
};
