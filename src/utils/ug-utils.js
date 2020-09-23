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

// Source: https://flaviocopes.com/how-to-divide-array-js/
function divideIntoColumns(data, numColumns) {
  let dividedData = [];
  let itemsPerRow = Math.ceil(data.length / numColumns);

  for(let i=0;i<numColumns;i++){
    dividedData.push([]);
  }

  for (let row = 0; row < numColumns; row++) {
      for (let i = 0; i < itemsPerRow; i++) {
          const value = data[i + row * itemsPerRow]
          if (!value) continue //avoid adding "undefined" values
          dividedData[row].push(value)
      }
  }

  return dividedData;

}

export { stripHTMLTags, setHeadingLevel, contentIsNullOrEmpty, sortLastModifiedDates, divideIntoColumns };