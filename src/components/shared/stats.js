import React from 'react';
import PropTypes from 'prop-types';
import { contentExists} from 'utils/ug-utils';
import 'styles/stats.css';

function Stats (props) {
	return (
		
		<React.Fragment>
			{contentExists(props.statsData) && props.statsData.length !== 0 && <>
				{props.statsData.map (stat => {	
					let statRange = stat.field_stat_range;
					let statType = stat.relationships.field_stat_type.name;
					let statValue = stat.field_stat_value;
					let statValueEnd = stat.field_stat_value_end;
					let statFAIcon = stat.field_font_awesome_icon ;

					return <React.Fragment key={stat.drupal_id}>
					<div className="uog-card text-break">
						<dt>
							{contentExists(statFAIcon) === true && <span className="fa-icon-colour"><i className={statFAIcon}>  </i></span>}
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
