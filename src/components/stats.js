import React from 'react';
import PropTypes from 'prop-types';
import SVG from 'react-inlinesvg';
import { contentIsNullOrEmpty, FormatMoney } from '../utils/ug-utils';
import '../styles/stats.css';

function Stats (props) {
	return (
		<React.Fragment>
			{!contentIsNullOrEmpty(props.statsData) && props.statsData.length !== 0 && <>
				{props.statsData.map (stat => {	
					let statIcon = stat.relationships.field_stat_icon.relationships.field_media_image.localFile;					
					let statMeasure = stat.field_stat_measure;
					let statRange = stat.field_stat_range;
					let statType = stat.relationships.field_stat_type.name;
					let statValue = parseFloat(stat.field_stat_value,10);
					let statValueEnd = parseFloat(stat.field_stat_value_end,10);
					let timePeriod = stat.field_stat_time;
					
					return <React.Fragment key={stat.drupal_id}>
					<div className="uog-card">							
						<dt>
							{statIcon !== null && <><SVG src={statIcon.publicURL} /></>} 
							{statRange === true && statValueEnd !== null && <> 
								{statMeasure === "other" ? statValue + " - " + statValueEnd : null}
								{statMeasure === "time" ? statValue + " - " + statValueEnd + " " + timePeriod : null}
								{statMeasure === "money" ? <FormatMoney value={statValue} /> + " - " + <FormatMoney value={statValueEnd} />: null}
								{statMeasure === "percentage" ? statValue + " - " + statValueEnd + "%" : null}
							</>}							
							{statMeasure === "money" ? <FormatMoney value={statValue} /> : null}
							{statMeasure === "time" ? statValue + " " + timePeriod : null}
							{statMeasure === "other" ? statValue : null}
							{statMeasure === "percentage" && statRange === false ? statValue + "%" : null}
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