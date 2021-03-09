import React from 'react';
import PropTypes from 'prop-types';
//import SVG from 'react-inlinesvg';
import { contentExists } from '../utils/ug-utils';
import '../styles/stats.css';

function Stats (props) {
	//let statIcon = stat.relationships.field_stat_icon.relationships.field_media_image.localFile;
	let statRange = props.widgetData.field_stat_range;
	let statType = props.widgetData.relationships.field_stat_type.name;
	let statValue = props.widgetData.field_stat_value;
	let statValueEnd = props.widgetData.field_stat_value_end;
	
	return <React.Fragment key={props.widgetData.drupal_id}>
	<div className="uog-card">
		<h3>{statRange === true && statValueEnd !== null ? statValue + " - " + statValueEnd : statValue}</h3>
		<p>{statType}</p>
	</div>
	</React.Fragment>
}
		


Stats.propTypes = {
	widgetData: PropTypes.object,
}
Stats.defaultProps = {
	widgetData: null,
}
export default Stats