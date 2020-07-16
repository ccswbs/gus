import React from "react"
import PropTypes from "prop-types"
import "../styles/tags.css"

function Tags ({ tagData }) {
	var tagsList = "";
    if (tagData !== null) {
		tagData.forEach(tag => {
			tagsList += "<li>#" + tag.name + "</li>";
		});
		if (tagsList !== "") {
			return <ul dangerouslySetInnerHTML={{ __html: tagsList }}  />
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