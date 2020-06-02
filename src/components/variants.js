import React from "react"
import PropTypes from "prop-types"

function Variants ({ progvarData }) {
	var progvar = "";
	var progvarList = "";
    if (progvarData !== null) {
		progvarData.forEach(variant => {
			const heading = (variant.relationships.field_variant_name.name !== undefined && variant.relationships.field_variant_name.name !== null ? "<h3>" + variant.relationships.field_variant_name.name + "</h3>": "");
			const description = (variant.field_variant_info.value !== undefined && variant.field_variant_info.value !== null ? variant.field_variant_info.value: "");
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