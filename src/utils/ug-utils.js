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

export { stripHTMLTags, setHeadingLevel, contentIsNullOrEmpty };