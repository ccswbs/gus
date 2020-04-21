import React from "react"
import PropTypes from 'prop-types'

function Degrees ({ degreesData }) {
	var degrees;
	var degreesList="";
	if (degreesData !== null) {
		for (var i=0; i < degreesData.length; i++) {
				degreesList += "<li>" + degreesData[i].name + " (" + degreesData[i].field_degree_acronym + ")</li>";
			}
		degrees = "<h2>Degrees Offered</h2><ul>" + degreesList + "</ul>";
		return <div dangerouslySetInnerHTML={{__html: degrees}}/>
	} else {
		return null
	}
}

Degrees.propTypes = {
	degreesData: PropTypes.arrayOf(PropTypes.string),
}

export default Degrees