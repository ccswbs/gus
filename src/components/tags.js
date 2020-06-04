import React from "react"
import PropTypes from "prop-types"

function Tags ({ tagData }) {
	var tags = "";
	var tagsList = "";
    if (tagData !== null) {
		tagData.forEach(tag => {
			//const heading = (tag.name !== undefined && tag.name !== null ? "#" + tag.name + " ": "");
			tagsList += "#" + tag.name + " ";
		});
		if (tagsList !== "") {
			tags = "<strong>Tags:</strong> " + tagsList;
			return <div dangerouslySetInnerHTML={{__html: tags}} />
		}		
    }
    return null;
}

Tags.propTypes = {
    tagData: PropTypes.array,
}
Tags.defaultProps = {
    tagData: null,
}
  
export default Tags