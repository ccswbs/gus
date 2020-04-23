import React from "react"
import PropTypes from 'prop-types'

function Units ({ unitData }) {
	var units;
	var unitList="";
	if (unitData !== null) {
		for (var i=0; i < unitData.length; i++) {
				unitList += "<li>" + unitData[i].relationships.field_units[i].name + " (" + unitData[i].relationships.field_units[i].field_unit_acronym + ")</li>";
			}
		units = "<h2>Departments</h2><ul>" + unitList + "</ul>";
		return <div dangerouslySetInnerHTML={{__html: units}}/>
	} else {
		return null
	}
}

Units.propTypes = {
	unitData: PropTypes.arrayOf(PropTypes.string),
}

export default Units