import React from "react"
import PropTypes from 'prop-types'

function Courses ({ courseData }) {
	var courses;
	var courseURL;
	var courseList="";
	var courseLevel=0;
	if ((courseData !== null) && (courseData !== undefined)) {
		courseData.forEach(course => {
			var courseTitle = course.node.title;
			courseLevel = course.node.field_level;
			courseURL = (course.node.field_course_url !== undefined && course.node.field_course_url !== null ? courseURL = course.node.field_course_url.uri : "");
			courseTitle = (courseURL !== "" ? "<a href='" + courseURL + "'>" + courseTitle + "</a>" : courseTitle);
			courseList += "<tr><th scope='row'>" + courseLevel + "</th><td>" + courseTitle + "</td><td>" + course.node.field_code + "</td><td>" + course.node.field_credits + "</td></tr>";
		});
		if (courseList !== "") {
			courses = "<table class='table table-borderless'><thead><tr><th scope='col'>Year</th><th scope='col'>Class</th><th scope='col'>Code</th><th scope='col'>Credits</th></tr></thead><tbody>" + courseList + "</tbody></table>";
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