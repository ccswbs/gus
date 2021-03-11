import React from 'react';
import PropTypes from 'prop-types';
import SVG from 'react-inlinesvg';
import { contentExists } from '../utils/ug-utils';
import '../styles/stats.css';

function Stats (props) {
	return (
		<React.Fragment>
			{contentExists(props.statsData) && props.statsData.length !== 0 && <>
				{props.statsData.map (stat => {	
					let statIcon = (contentExists(stat.relationships.field_stat_icon) ? stat.relationships.field_stat_icon.relationships.field_media_image.localFile : null);
					let statRange = stat.field_stat_range;
					let statType = stat.relationships.field_stat_type.name;
					let statValue = stat.field_stat_value;
					let statValueEnd = stat.field_stat_value_end;
					
					return <React.Fragment key={stat.drupal_id}>
					<div className="uog-card">
						<dt>
							{statIcon !== null && <><SVG src={statIcon.publicURL} /></>} 
							{statRange === true && statValueEnd !== null ? statValue + " - " + statValueEnd : statValue}
						</dt>
						<dd>{statType}</dd>
					</div>
					</React.Fragment>
				})}
			</>}
		</React.Fragment>
	)
}

Stats.propTypes = {
	statsData: PropTypes.array,
}
Stats.defaultProps = {
	statsData: null,
}
export default Stats