import React from "react"
import PropTypes from "prop-types"

function Variants ({ progvarData }) {
	var progvar = "";
	var progvarList = "";
	var courseList = "";
	var classes = "";
    if (progvarData !== null) {
		progvarData.forEach(variant => {
			const variantName = variant.relationships.field_variant_name;
			const variantInfo = variant.field_variant_info;
			var courses = variant.relationships.field_courses;
			var heading = "";
			var description = "";
			if (courses !== null) {
				courses.forEach(course => {
					courseList += "<li>" + course.title + " (" + course.field_code + ")</li>";
				});
				if (courseList !== "") {
					classes = "<h3>Classes</h3><ul>" + courseList + "</ul>";
				}
			}
			heading = (variantName !== undefined && variantName !== null ? "<h3>" + variantName.name + "</h3>" : "");
			description = (variantInfo !== undefined && variantInfo !== null ? variantInfo.value: "");
			progvar += heading + description + classes;
		});
		if (progvar !== "") {
			progvarList = "<h2>Program Information</h2>" + progvar;
			return <div dangerouslySetInnerHTML={{__html: progvarList}} />
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