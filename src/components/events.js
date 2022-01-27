import PropTypes from 'prop-types';
import React from 'react';
import moment from 'moment';
import { contentExists } from '../utils/ug-utils';

function Events (props) {

    const allEvents = props.eventData;

	if (contentExists(allEvents)) {
	
		return (<>
			<ul className="two-col-md">
                {allEvents.map(wpEvent => {
                    let eventMonth = moment(wpEvent.node.startDate,"YYYY-MM-DD").format("MMM");
                    let eventDay = moment(wpEvent.node.startDate,"YYYY-MM-DD").format("D");
                    let eventTime = moment(wpEvent.node.startDate,"YYYY-MM-DD HH:mm").format("h:mm A");
                    
                    return <li key={wpEvent.node.id}>{eventMonth} {eventDay} at {eventTime}: <a href={wpEvent.node.url}>{wpEvent.node.title}</a></li>
                })}
            </ul> 
		</>)
	}
    console.log(allEvents);
	return <><p>No events here</p></>;
}

Events.propTypes = {
    eventData: PropTypes.array,
}
Events.defaultProps = {
    eventData: null,
}

export default Events