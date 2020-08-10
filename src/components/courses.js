import React from "react"
import PropTypes from 'prop-types'

function Courses ({ courseData }) {
	var courses;
	var courseList="";
	if ((courseData !== null) && (courseData !== undefined)) {
		/*courseData.forEach(course => {
            courseList += "<li>" + course.title + " (" + course.field_code + ")</li>";
		});
		if (courseList !== "") {
			courses = "<h2>Courses for all Program Variants</h2><ul>" + courseList + "</ul>";
			return <div dangerouslySetInnerHTML={{__html: courses}}/>
		}*/	
		return <p>"test"</p>
	}
	return null;
}

Courses.propTypes = {
	courseData: PropTypes.array,
}
Courses.defaultProps = {
    courseData: null,
}
export default Courses