function contentExists(content) {
    if (content && !Array.isArray(content)) {
        return true;
    } else if (content && Array.isArray(content) && content.length > 0) {
        return true;
    }
	return false;
}

// Source: https://flaviocopes.com/how-to-divide-array-js/
function divideIntoColumns(data, numColumns) {
	let dividedData = [];
	let itemsPerRow = Math.ceil(data.length / numColumns);

	for (let i=0; i<numColumns; i++) {
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

function fontAwesomeIconColour(colourChoice) {
    switch(colourChoice) {
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
	let level = parseInt(headingLevel.replace(/[^\d.]/g,'')) + 1;
	let nextHeadingLevel = setHeadingLevel('h' + level);
	return nextHeadingLevel;
}

function setHeadingLevel(headingLevel) {
	// console.log(headingLevel, "setHeadingLevel")
	const validHeadingLevels = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'];
	const safeHeading = headingLevel ? headingLevel.toLowerCase() : '';
	const selectedHeading = validHeadingLevels.includes(safeHeading) ? safeHeading : 'p';
	return selectedHeading;
}

function sortLastModifiedDates(dates) {
	return dates.slice().flat().sort();
}

function stripHTMLTags(content) {
	return content !== null ? content.replace(/(<([^>]+)>)/ig,"") : ``;
}

const ConditionalWrapper = ({ condition, wrapper, children }) => 
  condition ? wrapper(children) : children;

export { 
	contentExists,
	divideIntoColumns,
	fontAwesomeIconColour,
	getNextHeadingLevel,
	setHeadingLevel,
	sortLastModifiedDates,
	stripHTMLTags,
    ConditionalWrapper
   };
