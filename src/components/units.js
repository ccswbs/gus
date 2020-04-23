import React from "react"
import PropTypes from 'prop-types'

function Units ({ unitData }) {
	var units;
	var unitList="";
	if (unitData !== null) {
		for (var i=0; i < unitData.length; i++) {
				unitList += "<li>" + unitsData[i].name + " (" + unitsData[i].field_degree_acronym + ")</li>";
			}
		units = "<h2>Departments</h2><ul>" + unitList + "</ul>";
		return <div dangerouslySetInnerHTML={{__html: units}}/>
	} else {
		return null
	}
}

units.propTypes = {
	unitData: PropTypes.arrayOf(PropTypes.string),
}

export default Units