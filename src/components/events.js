import React from 'react';
import PropTypes from 'prop-types';
import { StaticQuery, graphql } from 'gatsby';
import { contentExists } from '../utils/ug-utils.js';
import moment from 'moment';
import '../styles/events.css';

function findMatches(fromDrupal, fromWP) {
    for (let i=0; i < fromDrupal.length; i++) {
        for (let j=0; j < fromWP.length; j++) {
            return fromDrupal[i].name == fromWP[j].name;
        }
    }
}

const generateEvents = (data, eventData) => {
    let drupalCategories = eventData.relationships.field_event_category;
    let matchAllCategories = eventData.field_match_categories;
    let title = eventData.field_title;
    let allEvents = data.allWpEvent.edges;
    let shownEvents = [];
    
    if (matchAllCategories) {
        for (let i=0; i < allEvents.length; i++) {        
            if (JSON.stringify(drupalCategories) === JSON.stringify(allEvents[i].node.eventsCategories.nodes)) {
                shownEvents.push(allEvents[i]);
            }        
        } 
    } else {
        for (let i=0; i < allEvents.length; i++) {
            if (findMatches(drupalCategories, allEvents[i].node.eventsCategories.nodes)) {
                shownEvents.push(allEvents[i]);
            }
        } 
    }
    
    return (contentExists(shownEvents) ?
    <React.Fragment key={eventData.drupal_id}>
        <h2 className="mb-5">{contentExists(title) ? title : "Upcoming Events"}</h2>
        <div className="event-list row mb-5">
        {shownEvents.slice(0,4).map(wpEvent => {
            let eventMonth = moment(wpEvent.node.startDate,"YYYY-MM-DD").format("MMM");
            let eventDay = moment(wpEvent.node.startDate,"YYYY-MM-DD").format("D");
            let eventStartTime = moment(wpEvent.node.startDate,"YYYY-MM-DD HH:mm").format("h:mm A");
            let eventEndTime = moment(wpEvent.node.endDate,"YYYY-MM-DD HH:mm").format("h:mm A");
            
            return (<>
            <div key={wpEvent.node.id} className="card border-0 col-md-3 flex-row p-0 ">
                <div className="event-day col border border-5 d-flex me-3 p-2">
                    <p className="align-self-center mb-0 mx-auto text-center w-50">
                        <span className="fs-2 text-nowrap text-uppercase">{eventMonth}</span> <span className="display-4 fw-bold">{eventDay}</span>
                    </p>
                </div>
                <div className="card-body col-5 d-flex flex-column p-0">
                    <a className="event-title border-0 fs-4 fw-bold lh-base stretched-link text-decoration-none" href={wpEvent.node.url}>{wpEvent.node.title}</a>
                    <p className="fs-4 mt-auto mb-0">{eventStartTime} - {eventEndTime}</p>
                </div>
            </div>
            </>)
        })}
        </div>    
    </React.Fragment>
    : null)
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
