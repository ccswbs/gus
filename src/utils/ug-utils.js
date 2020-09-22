function stripHTMLTags(content) {
  return content !== null ? content.replace(/(<([^>]+)>)/ig,"") : ``;
}

function setHeadingLevel(headingLevel) {
  const validHeadingLevels = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'];
  const safeHeading = headingLevel ? headingLevel.toLowerCase() : '';
  const selectedHeading = validHeadingLevels.includes(safeHeading) ? safeHeading : 'p';
  return selectedHeading;
}

function contentIsNullOrEmpty(content) {
  if(content === null || content === undefined || content === "" || 
    (Array.isArray(content) && (content.length === 0))){
    return true;
  }

  return false;
}

function sortLastModifiedDates(dates) {
  return dates.slice().flat().sort();
}

// combine multiple body values and place sticky values at the top
function combineAndSortBodyFields (content) {
  let stickyContent = [];
  let allContent = [];

  if(contentIsNullOrEmpty(content)) { return ""; }

  content.forEach((edge) => {
    if (!contentIsNullOrEmpty(edge.node.body.processed)){
      if(edge.node.sticky === true) {
        stickyContent.push(edge.node.body.processed);
      } else {
        allContent.push(edge.node.body.processed);
      }
    }
  })

  allContent.unshift(stickyContent);

  return allContent.join("");
}

export { stripHTMLTags, setHeadingLevel, contentIsNullOrEmpty, sortLastModifiedDates, combineAndSortBodyFields };