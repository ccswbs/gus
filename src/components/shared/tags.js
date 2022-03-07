import React from "react"
import PropTypes from "prop-types"
import 'styles/tags.css'

function Tags ({ tagData }) {
	var tagsList = "";
    if (tagData !== null) {
		tagData.forEach(tag => {
			// space after list item is intentional (helps css wrap)
			tagsList += "<li>#" + tag.name + "</li> ";
		});
		if (tagsList !== "") {
			return <div id="tags">
						<ul className="lead" dangerouslySetInnerHTML={{ __html: tagsList }}  />
					</div>
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