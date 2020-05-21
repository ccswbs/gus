import React from "react"
import PropTypes from "prop-types"

function Variants ({ progvarData }) {
	var progvar = "";
	var progvarList = "";
    if (progvarData !== null) {
		progvarData.forEach(variant => {
			const heading = (variant.relationships.field_heading.name !== undefined && variant.relationships.field_heading.name !== null ? "<h3>" + variant.relationships.field_heading.name + "</h3>": "");
			const description = (variant.field_description.value !== undefined && variant.field_description.value !== null ? variant.field_description.value: "");
			progvar += heading + description;
		});
		if (progvar !== "") {
			progvarList = "<h2>Program Variants</h2>" + progvar;
			return <div dangerouslySetInnerHTML={{__html: progvarList}} />
		}		
    }
    return null;
}

Variants.propTypes = {
    progvarData: PropTypes.arrayOf(PropTypes.string),
}
Variants.defaultProps = {
    progvarData: null,
  }
  
export default Variants