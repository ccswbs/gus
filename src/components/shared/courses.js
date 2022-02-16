import React from 'react';
import PropTypes from 'prop-types';
import 'styles/courses.css';

function Courses ({ courseData, courseNotes, headingLevel }) {
	var courses;
	var courseURL;
	var courseList="";
	var trackCourseLevel="";
	var coursesDisplay="<section class='row row-with-vspace'>";
	var columnSetting = ((courseNotes === null || courseNotes === "") || (courseData === null || courseData === undefined)) ? "col-lg-12" : "col-lg-6";
	
	courseData.sort((a,b) => (a.field_level > b.field_level) ? 1 : (a.field_level === b.field_level) ? ((a.field_code > b.field_code) ? 1 : -1) : -1);
	
	if ((courseData !== null) && (courseData !== undefined)) {
		courseData.forEach(course => {
			let courseTitle = course.title;
			let displayLevel = "";
			if(trackCourseLevel !== course.field_level){
				trackCourseLevel = course.field_level;
			}else {
				displayLevel=" class='sr-only'";
			}
			
			courseURL = (course.field_course_url !== undefined && course.field_course_url !== null ? courseURL = course.field_course_url.uri : "");
			courseTitle = (courseURL !== "" ? "<a href='" + courseURL + "'>" + courseTitle + "</a>" : courseTitle);
			courseList += "<tr>";
			courseList += "<td class='course-field-level'><strong" + displayLevel + ">" + course.field_level + "</strong></td>";
			courseList += "<td>" + courseTitle + "</td>";
			courseList += "<td>" + course.field_code + "</td>";
			courseList += "<td>" + course.field_credits + "</td>";
			courseList += "</tr>";
		});
		
		if (courseList !== "") {
			courses = "<div class='" + columnSetting + "'><div class='table-responsive'><table class='table table-borderless'><thead><tr><th scope='col'>Year</th><th scope='col'>Class</th><th scope='col'>Code</th><th scope='col'>Credits</th></tr></thead><tbody>" + courseList + "</tbody></table></div></div>";
			coursesDisplay += courses;
		}		
	}

	if ((courseNotes !== null) && (courseNotes !== "")) {
		coursesDisplay += "<div class='" + columnSetting + "'><" + headingLevel + " class='course-notes-heading'>Notes</" + headingLevel + ">" + courseNotes + "</div>";
	}

	coursesDisplay += "</section>";

	return <div className="container" dangerouslySetInnerHTML={{__html: coursesDisplay}}/>
}

Courses.propTypes = {
	courseData: PropTypes.array,
	courseNotes: PropTypes.string,
}
Courses.defaultProps = {
	courseData: null,
	courseNotes: "",
}
export default Courses