import React from 'react';
import PropTypes from 'prop-types';
import { setHeadingLevel } from 'utils/ug-utils';

function Units (props) {
    let Heading = setHeadingLevel(props.headingLevel);

	return (
		<React.Fragment>
			{props.specData !== null && props.specData.length !== 0 && <>
				<Heading>Associated Units</Heading>
				<ul>
					{props.specData.map (element => {
                        let field_units = element.relationships.field_units; 
                        return (
                            field_units.map (unit => {
                                let acronym = (unit.field_unit_acronym !== undefined && unit.field_unit_acronym !== null ? ` (` + unit.field_unit_acronym + `)`: ``);
                                return <li key={unit.drupal_id}>{unit.name} {acronym}</li>
                            })
                        )
					})}
				</ul>
			</>}
		</React.Fragment>
	)
}

Units.propTypes = {
    specData: PropTypes.array,
    headingLevel: PropTypes.string,
}
Units.defaultProps = {
    specData: null,
    headingLevel: `p`,
  }
  
export default Units