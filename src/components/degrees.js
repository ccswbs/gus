import React from 'react';
import PropTypes from 'prop-types';
import SVG from 'react-inlinesvg';
import { contentIsNullOrEmpty } from '../utils/ug-utils';
import { useIconData } from '../utils/fetch-icon';
import '../styles/stats.css';

function Degrees (props) {
	var dtValue = ``;
	var iconURL = ``;
	const data = useIconData();	
	
 	if (data !== null && data !== undefined) {
		for (let i=0; i<data.length; i++) {
			for (let j=0; j<data[i].node.relationships.field_tags.length; j++) {
				if (data[i].node.relationships.field_tags[j].name === "icon-degree") {
					iconURL = data[i].node.relationships.field_media_image.localFile.publicURL;
				}
			}
		}
	}
	
	return (
		<React.Fragment>
			{!contentIsNullOrEmpty(props.degreesData) && <>									
				<div className="uog-card">
					<dt>{iconURL !== null && <><SVG src={iconURL} /></>} {dtValue = props.degreesData.length === 1 ? "Degree" : "Degrees"}</dt>
					{props.degreesData.map (degree => {
						const acronym = (degree.field_degree_acronym !== undefined && degree.field_degree_acronym !== null ? ` (` + degree.field_degree_acronym + `)`: ``);
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