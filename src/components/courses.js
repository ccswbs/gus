import React from "react"
import PropTypes from 'prop-types'

function Courses ({ courseData }) {
	var courses;
	var courseList="";
	if ((courseData !== null) && (courseData !== undefined)) {
		courseData.forEach(course => {
			courseList += 
			"<tr>" 
			+ "<td>" + course.node.field_level + "</td>"
			+ "<td>" + course.node.title + "</td>" 
			+ "<td>" + course.node.field_code + "</td>"
			+ "<td>" + course.node.field_credits + "</td>"
			+ "</tr>";
		});
		if (courseList !== "") {
			courses = "<h2>Courses for all Program Variants</h2>"
				+ "<table class='table table-borderless'>" 
				+ "<tr>"
				+ "<th scope='col'>Year</th>"
				+ "<th scope='col'>Class</th>"
				+ "<th scope='col'>Code</th>"
				+ "<th scope='col'>Credits</th>"
				+ "</tr>"					
				+ courseList + "</table>";
			return <div dangerouslySetInnerHTML={{__html: courses}}/>
		}
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