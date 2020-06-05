import React from "react"
import PropTypes from "prop-types"

function Tags ({ tagData }) {
	var tags = "";
	var tagsList = "";
    if (tagData !== null) {
		tagData.forEach(tag => {
			tagsList += "#" + tag.name + " ";
		});
		if (tagsList !== "") {
			tags = tagsList;
			return <div id="tags"><div class="container" dangerouslySetInnerHTML={{__html: tags}} /></div>
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