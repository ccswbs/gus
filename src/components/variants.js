import React from "react"
import PropTypes from "prop-types"

function Variants ({ progvarData }) {
	var progvar = "";
    if (progvarData !== null) {
		progvarData.forEach(variant => {
			const variantName = variant.relationships.field_variant_name;
			const variantInfo = variant.field_variant_info;
			var heading = "";
			var description = "";
			heading = (variantName !== undefined && variantName !== null ? "<h3>" + variantName.name + "</h3>" : "");
			description = (variantInfo !== undefined && variantInfo !== null ? variantInfo.value: "");
			progvar += heading + description;
		});
		if (progvar !== "") {
			return <div dangerouslySetInnerHTML={{__html: progvar}} />
		}		
    }
    return null;
}

Variants.propTypes = {
    progvarData: PropTypes.array,
}
Variants.defaultProps = {
    progvarData: null,
}
  
export default Variants