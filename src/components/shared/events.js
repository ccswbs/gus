import React from 'react';
import PropTypes from 'prop-types';
import { StaticQuery, graphql } from 'gatsby';
import { contentExists } from 'utils/ug-utils.js';
import moment from 'moment';
import 'styles/events.css';

function findMatches(fromDrupal, fromWP) {
    for (let i=0; i < fromDrupal.length; i++) {
        for (let j=0; j < fromWP.length; j++) {
            return fromDrupal[i].name === fromWP[j].name;
        }
    }
}

const generateEvents = (data, eventData) => {
    let drupalCategories = eventData.relationships.field_event_category;
    let matchAllCategories = eventData.field_match_categories;
    let title = eventData.field_title;
    let allEvents = data.allWpEvent.edges;
    let shownEvents = [];
    let colClasses;
    
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
    
    switch(shownEvents.length) {
        case 1:
            colClasses = " col";
        break;
        case 2:
            colClasses = " col-md-6";
        break;
        case 3:
            colClasses = " col-xl-4";
        break;
        default:
            colClasses = " col-xl-3 col-md-6";
        break;
    }
    
    
    return (<React.Fragment key={eventData.drupal_id}>
        <h2 className="mb-5">{contentExists(title) ? title : "Upcoming Events"}</h2>
        {contentExists(shownEvents) ? 
        <div className="gy-0">
          <ul className="event-list row gx-3 gy-5 mb-5">
          {shownEvents.slice(0,4).map(wpEvent => {
              let eventMonth = moment(wpEvent.node.startDate,"YYYY-MM-DD").format("MMM");
              let eventDay = moment(wpEvent.node.startDate,"YYYY-MM-DD").format("D");
              let eventStartTime = moment(wpEvent.node.startDate,"YYYY-MM-DD HH:mm").format("h:mm A");
              let eventEndTime = moment(wpEvent.node.endDate,"YYYY-MM-DD HH:mm").format("h:mm A");
              let eventLink = (contentExists(wpEvent.node.url) ? wpEvent.node.url : "https://news.uoguelph.ca" + wpEvent.node.uri);
              
              let srMonth = moment(wpEvent.node.startDate,"YYYY-MM-DD").format("MMMM");
              let srDayName = moment(wpEvent.node.startDate,"YYYY-MM-DD").format("dddd");
              let srDayNumber = moment(wpEvent.node.startDate,"YYYY-MM-DD").format("Do");
              
              return (<>
              <li key={wpEvent.node.id} className={"card border-0 flex-row" + colClasses}>
                  <div className="event-day col-3 col-md-4 col-xl-4 border border-5 d-flex me-3 p-2" aria-hidden="true">
                      <p className="align-self-center mb-0 mx-auto text-center w-50">
                          <span className="fs-2 text-nowrap text-uppercase">{eventMonth}</span> <span className="display-4 fw-bold text-nowrap">{eventDay}</span>
                      </p>
                  </div>
                  <div className="card-body col d-flex flex-column pt-0 pb-0 ps-0">
                      <a className="event-title border-0 fs-4 fw-bold lh-base stretched-link text-decoration-none" href={eventLink}>{wpEvent.node.title}</a>
                      <p className="fs-4 mt-auto mb-0"><span className="visually-hidden">Happening on {srDayName} {srMonth} {srDayNumber} from </span><time datetime={wpEvent.node.startDate}>{eventStartTime}</time> to <time datetime={wpEvent.node.endDate}>{eventEndTime}</time></p>
                  </div>
              </li>
              </>)
          })}
          </ul>
        </div>
    
        : <p>No events at this time.</p>}
    </React.Fragment>)
}

const Events = ({eventData}) => (
  <StaticQuery
    query={
      graphql`query EventsQuery {
  allWpEvent(filter: {isPast: {eq: false}}, sort: {startDate: ASC}) {
    edges {
      node {
        id
        title
        startDate
        endDate
        uri
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

fragment EventsParagraphFragment on paragraph__events_widget {
  drupal_id
  field_match_categories
  field_title
  relationships {
    field_event_category {
      name
    }
  }
}`
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
