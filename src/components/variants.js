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
					courseList += 
					"<tr>" 
					+ "<td>" + course.field_level + "</td>"
					+ "<td>" + course.title + "</td>" 
					+ "<td>" + course.field_code + "</td>"
					+ "<td>" + course.field_credits + "</td>"
					+ "</tr>";
				});
				if (courseList !== "") {
					classes = "<h3>Courses</h3>"
					+ "<table class='table table-borderless'>" 
					+ "<tr>"
					+ "<th scope='col'>Year</th>"
                    + "<th scope='col'>Class</th>"
                    + "<th scope='col'>Code</th>"
                    + "<th scope='col'>Credits</th>"
                    + "</tr>"					
					+ courseList + "</table>";
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