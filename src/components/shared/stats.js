import React from 'react';
import PropTypes from 'prop-types';
import 'styles/stats.css';

function Stats (props) {
	return (		
		<React.Fragment>
			{props.statsData && props.statsData.length !== 0 && <>
				{props.statsData.map (stat => {	
					let statRange = stat.field_stat_range;
					let statType = stat.relationships.field_stat_type.name;
					let statValue = stat.field_stat_value;
					let statValueEnd = stat.field_stat_value_end;
					let statFAIcon = stat.field_font_awesome_icon ;

					return <div key={stat.drupal_id} className="uog-card text-break">
						<dt>
							{statFAIcon && <span className="fa-icon-colour"><i className={statFAIcon}>  </i></span>}
							{statRange && statValueEnd !== null ? statValue + " - " + statValueEnd : statValue}
						</dt>
						<dd>{statType}</dd>
					</div>
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
