import React from "react"
import PropTypes from "prop-types"
import "../styles/tags.css"

function Tags ({ tagData }) {
	var tags = "";
	var tagsList = "";
    if (tagData !== null) {
		tagData.forEach(tag => {
			tagsList += "<li>" + "#" + tag.name + "</li>";
		});
		if (tagsList !== "") {
			tags = "<ul class='container'>" + tagsList + "</ul>";
			return <div id="tags" dangerouslySetInnerHTML={{__html: tags}} />
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