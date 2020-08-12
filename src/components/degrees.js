import React from 'react';
import PropTypes from 'prop-types';
import { setHeadingLevel } from '../utils/ug-utils';


function Degrees (props) {
    let Heading = setHeadingLevel(props.headingLevel);

	return (
		<React.Fragment>
			{props.degreesData.length !== 0 && <>
				<Heading>Degrees Offered</Heading>
				<ul>
					{props.degreesData.map (degree => {
						const acronym = (degree.field_degree_acronym !== undefined && degree.field_degree_acronym !== null ? ` (` + degree.field_degree_acronym + `)`: ``);
						return <li key={degree.drupal_id}>{degree.name} {acronym}</li>
					})}
				</ul>
			</>}
		</React.Fragment>
	)
}

Degrees.propTypes = {
	degreesData: PropTypes.array,
	headingLevel: PropTypes.string,
}
Degrees.defaultProps = {
	degreesData: null,
	headingLevel: `p`,
}
export default Degrees