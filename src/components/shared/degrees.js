import React from 'react';
import PropTypes from 'prop-types';
import { contentExists } from 'utils/ug-utils';
import 'styles/stats.css';

function Degrees (props) {
	let dtValue = props.degreesData.length === 1 ? "Degree" : "Degrees";
	
	return (
		<React.Fragment>
			{contentExists(props.degreesData) && <>									
				<div className="uog-card">
					<dt><span className="fa-icon-colour"><i className="fa-solid fa-graduation-cap" aria-hidden="true">  </i></span>{dtValue}</dt>
					{props.degreesData.map (degree => {
						const acronym = degree.field_degree_acronym ? "(" + degree.field_degree_acronym + ")" : null;
						return <dd key={degree.drupal_id}>{degree.name} {acronym}</dd>
					})}
				</div>
			</>}
		</React.Fragment>
	)
}

Degrees.propTypes = {
	degreesData: PropTypes.array,
}
Degrees.defaultProps = {
	degreesData: null,
}
export default Degrees