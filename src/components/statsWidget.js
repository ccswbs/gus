import React from 'react';
import PropTypes from 'prop-types';
import Stats from '../components/stats'

function StatsWidget (props) {
	
	let statsData = props.statsWidgetData.relationships.field_statistic;

	return (<>
		<dl className="d-flex flex-wrap flex-fill justify-content-center">
			<Stats statsData={statsData} />
		</dl>
	</>)
}
		


StatsWidget.propTypes = {
	statsWidgetData: PropTypes.object,
}
StatsWidget.defaultProps = {
	statsWidgetData: null,
}
export default StatsWidget