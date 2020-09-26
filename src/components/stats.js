import React from 'react';
import PropTypes from 'prop-types';
import SVG from 'react-inlinesvg';
import { contentIsNullOrEmpty } from '../utils/ug-utils';
import '../styles/stats.css';

function Stats (props) {
	return (
		<React.Fragment>
			{!contentIsNullOrEmpty(props.statsData) && props.statsData.length !== 0 && <>
				{props.statsData.map (stat => {	
					let statIcon = stat.relationships.field_stat_icon.relationships.field_media_image.localFile;
					let statType = stat.relationships.field_stat_type.name;
					let timePeriod = stat.field_stat_time;
					return <React.Fragment key={stat.drupal_id}>
					<div className="uog-card">							
						<dt>
							{statIcon !== null && <><SVG src={statIcon.publicURL} /></>} 
							{statType === "Potential Co-op Earnings" ? "$" : null}
							{parseFloat(stat.field_stat_value,10)} {timePeriod}
							{statType === "Job Placement Rate" ? "%" : null}
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