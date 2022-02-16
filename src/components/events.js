import React from 'react';
import PropTypes from 'prop-types';
import { StaticQuery, graphql } from 'gatsby';
import { contentExists } from '../utils/ug-utils.js';
import moment from 'moment';

const generateEvents = (data, eventData) => {
    let categories = eventData.relationships.field_event_category;
    let events = data.allWpEvent.edges;
    
    {/* Remove events that don't match selected categories */}
    for (let i = events.length - 1; i >= 0; i--) {        
        if (JSON.stringify(categories) !== JSON.stringify(events[i].node.eventsCategories.nodes)) {
            events.splice(i, 1);
        }
    }
    
    return (<>
        <h2 className="mb-5">Upcoming Events</h2>
        <div className="row">
        {events.slice(0,4).map(wpEvent => {
            let eventMonth = moment(wpEvent.node.startDate,"YYYY-MM-DD").format("MMM");
            let eventDay = moment(wpEvent.node.startDate,"YYYY-MM-DD").format("D");
            let eventStartTime = moment(wpEvent.node.startDate,"YYYY-MM-DD HH:mm").format("h:mm A");
            let eventEndTime = moment(wpEvent.node.endDate,"YYYY-MM-DD HH:mm").format("h:mm A");
            
            return (<>
            <div key={wpEvent.node.id} className="card flex-row col-md-3 p-0 border-0">
                <div className="col border border-5 border-warning d-flex me-3">
                <p className="align-self-center mb-0 mx-auto text-center w-50">
                    <span className="fs-2 text-nowrap text-uppercase">{eventMonth}</span> <span className="display-4 fw-bold">{eventDay}</span>
                </p>
                </div>
                <div className="card-body col-5 d-flex flex-column p-0">
                    <p className="lh-1 mt-3 me-3"><a className="link-dark fs-4 fw-bold stretched-link border-0 text-decoration-none" href={wpEvent.node.url}>{wpEvent.node.title}</a></p>
                    <p className="fs-4 mt-auto">{eventStartTime} - {eventEndTime}</p>
                </div>
            </div>
            </>)
        })}
        </div>    
    </>)
}

const Events = ({eventData}) => (
  <StaticQuery
    query={
      graphql`
        query EventsQuery {
          allWpEvent(
            filter: {isPast: {eq: false}}
            sort: {fields: startDate, order: ASC}
          ) {
            edges {
              node {
                id
                title
                startDate
                endDate
                url
                eventsCategories {
                  nodes {
                    name
                  }
                }
              }
            }
          }
        }
      `
      }
    render={data => generateEvents(data, eventData)}
  />
)

Events.propTypes = {
    eventData: PropTypes.object,
}

Events.defaultProps = {
    eventData: ``,
}

export default Events
