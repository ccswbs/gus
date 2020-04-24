import React from "react"
import PropTypes from 'prop-types'

function Units ({ unitData }) {
    var units;
    var unitList="";
    if (unitData !== null) {
        unitData.forEach(element => {
            const field_units = element.relationships.field_units; 
			if (field_units !== null) {
				field_units.forEach(unit => {
					const acronym = (unit.field_unit_acronym !== undefined && unit.field_unit_acronym !== null ? ` (` + unit.field_unit_acronym + `)`: ``);
					unitList += "<li>" + unit.name + acronym + "</li>";
				});
            }			
        });
        if (unitList !== ""){
            units = "<h2>Associcated Departments</h2><ul>" + unitList + "</ul>";
            return <div dangerouslySetInnerHTML={{__html: units}}/>
        }
        
    }
    return null;
}

Units.propTypes = {
    unitData: PropTypes.arrayOf(PropTypes.string),
}
Units.defaultProps = {
    unitData: null,
  }
  
export default Units