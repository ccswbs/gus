import React from "react"
import PropTypes from 'prop-types'

function Courses ({ courseData }) {
	var courses;
	var courseList="";
	if (courseData !== null) {
		courseData.forEach(course => {
			//const acronym = (course.field_course_acronym !== undefined && course.field_course_acronym !== null ? ` (` + course.field_course_acronym + `)`: ``);
            courseList += "<li>" + course.name + " (" + course.field_code + ")</li>";
		});
		if (courseList !== "") {
			courses = "<h2>Courses for all Program Variants</h2><ul>" + courseList + "</ul>";
			return <div dangerouslySetInnerHTML={{__html: courses}}/>
		}		
	}
	return null;
}

Courses.propTypes = {
	CoursesData: PropTypes.array,
}
Courses.defaultProps = {
    CoursesData: null,
}
export default Courses