import React from "react"
import PropTypes from 'prop-types'

function Degrees ({ degreesData }) {
	var degrees;
	var degreesList="";
	if (degreesData !== null) {
		degreesData.forEach(degree => {
			const acronym = (degree.field_degree_acronym !== undefined && degree.field_degree_acronym !== null ? ` (` + degree.field_degree_acronym + `)`: ``);
            degreesList += "<li>" + degree.name + acronym + "</li>";
		});
		if (degreesList !== "") {
			degrees = "<h3>Degrees Offered</h3><ul>" + degreesList + "</ul>";
			return <div dangerouslySetInnerHTML={{__html: degrees}}/>
		}		
	}
	return null;
}

Degrees.propTypes = {
	degreesData: PropTypes.array,
}
Degrees.defaultProps = {
    degreesData: null,
}
export default Degrees