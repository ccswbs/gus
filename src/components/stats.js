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
					var statIcon = stat.relationships.field_stat_icon.relationships.field_media_image.localFile;
					var timePeriod = stat.field_stat_time;
					return <React.Fragment>
					<div className="uog-card">							
						<dt style={{textTransform: 'capitalize'}}>
							{statIcon !== null && <><SVG src={statIcon.publicURL} /></>} 
							{parseFloat(stat.field_stat_value,10)} {timePeriod}
						</dt>
						<dd>{stat.relationships.field_stat_type.name}</dd>
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