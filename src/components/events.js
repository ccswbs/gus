import PropTypes from 'prop-types';
import React from 'react';
import styled from "styled-components";
import moment from 'moment';

const EventWrapper = styled.div`
  align-self: center;
  padding-top: 3rem;
  padding-bottom: 3rem;
  position: relative;
  @media (min-width: 1432px) {
    padding-left: 3rem;
    padding-right: 3rem;
  }
`

const EventList = styled.ul`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px,1fr));
  grid-gap: 1rem;
  padding: 1em 0 !important;
  margin: 0;
  list-style: none;
`
const EventCard = styled.div`
  display: grid;
  grid-template-columns: 6em auto;
  grid-template-rows: 6em;
  box-shadow: var(--dark) 1px 1px;
  background: var(--dark) 1px 1px;
`

const EventDate = styled.div`
  padding: 12px;
  border: solid 8px var(--uog-yellow);
  text-transform: uppercase;
  text-align: center;
  color: black;
  text-shadow: var(--dark) 2px 2px;
`

const Month = styled.div`
`

const Date = styled.div`
  font-size: 1.5em;
  font-weight: 700;
`

const EventDetails = styled.div`
  font-weight: 700;
  font-size: 1em;
  background: #dee2e6;
  padding: 1em;
  overflow: hidden;
  position: relative;
`
const EventDetailsContent = styled.div`
`
const EventTime = styled.div`
  font-weight: 100;
`
const MoreLink = styled.div`
  text-align: right;
  @media (min-width: 768px) {
    position: absolute;
    top: 6rem;
    right: 1rem;
  }
`

function Events (props) {
   
    const noResults = (props.eventsData?.length === 0)

    //const dateStr = props.eventsData[0].node.startDate;
    let myDatemon = null;
    let myDateday = null;
    let myTime = null;
	//moment(dateStr,"YYYY-MM-DD").format("MMM D");


    return(
        <div className="row row-with-vspace site-content">
            <section className="col-md-9 content-area">
			<EventWrapper>
	    <h2>Upcoming Events</h2>
	    {
                <MoreLink>
                  <a href="https://news.uoguelph.ca" className="btn btn-outline-info w-100 text-left btn-xs">View Past Events</a>
                </MoreLink>
            }
	    {
	    !noResults &&
			<EventList>
	    {props.eventsData.map (event => {
		    console.log(event.node.startDate);
		    myDatemon = moment(event.node.startDate,"YYYY-MM-DD").format("MMM"); 
		    myDateday = moment(event.node.startDate,"YYYY-MM-DD").format("D"); 
		    myTime = moment(event.node.startDate,"YYYY-MM-DD HH:mm").format("h:mm A"); 
		    return (
		<EventCard className="p-0 border-0 text-left">
          	   <EventDate>
            	      <Month>{myDatemon}</Month>
            	      <Date>{myDateday}</Date>
          	   </EventDate>
          	<EventDetails>
            	   <EventDetailsContent>
              	   <a href={event.node.link}>{event.node.title}</a> <br />
	           <EventTime>{myTime}</EventTime>
            	   </EventDetailsContent>
          	</EventDetails>
        	</EventCard>
			);
	    })}
			</EventList>
	    }		
	    {
		noResults && <p><em>No upcoming events.</em></p>
	    }
	    </EventWrapper>

            </section>
        </div>
    );      
}

Events.propTypes = {
    eventsData: PropTypes.array,
}
  
Events.defaultProps = {
    eventsData: null,
}

export default Events
