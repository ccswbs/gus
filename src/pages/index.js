import { graphql, Link } from 'gatsby';
import Layout from '../components/layout';
import React from 'react';
import Seo from '../components/seo';
import moment from 'moment';

const IndexPage = ({ data }) => {

    const pubPages = [];
    const unpubPages = [];
    const pubPrograms = [];
    const unpubPrograms = [];
    const pages = data.allNodePage.edges;
    const programs = data.programs.edges;
    
    const events = data.events.edges;
    /* let eventMonth;
    let eventDay;
    let eventTime; */
    
    for (let i=0; i<pages.length; i++) {
        if (pages[i].node.status === true) {
            pubPages.push(pages[i])
        } else {
            unpubPages.push(pages[i])
        }
    }
    for (let i=0; i<programs.length; i++) {
        if (programs[i].node.status === true) {
            pubPrograms.push(programs[i])
        } else {
            unpubPrograms.push(programs[i])
        }
    }
    
    return (
    <Layout menuName="main">
        <Seo title="Home" />
        <div className="container page-container">
        <div id="content" className="site-content">
            <h1>Gatsby UG Starter Theme</h1>
            <p>The University of Guelph, and everyone who studies here, explores here, teaches here and works here, is committed to one simple purpose: To Improve Life.</p>
            <h2>Pages</h2>
            <ul className="two-col-md">
                {pubPages.map((page) => (
                    <li key={page.node.drupal_id}><Link to={page.node.path.alias}>{page.node.title}</Link></li>
                ))}
            </ul>

            <h2>Programs</h2>
            <ul className="two-col-md">
                {pubPrograms.map((program) => (
                    <li key={program.node.drupal_id}><Link to={program.node.path.alias}>{program.node.title}</Link></li>
                ))}
            </ul>
            
            <h2>Unpublished Content</h2>
            <h3>Pages</h3>
            <ul className="two-col-md">
                {unpubPages.map((page) => (
                    <li key={page.node.drupal_id}><Link to={page.node.path.alias}>{page.node.title}</Link></li>
                ))}
            </ul>
            <h3>Programs</h3>
            <ul className="two-col-md">
                {unpubPrograms.map((program) => (
                    <li key={program.node.drupal_id}><Link to={program.node.path.alias}>{program.node.title}</Link></li>
                ))}
            </ul>
            
            <h2>Upcoming Events</h2>
            <div className="container"><div className="row">
                {events.map(wpEvent => {
                    let eventMonth = moment(wpEvent.node.startDate,"YYYY-MM-DD").format("MMM");
                    let eventDay = moment(wpEvent.node.startDate,"YYYY-MM-DD").format("D");
                    let eventStartTime = moment(wpEvent.node.startDate,"YYYY-MM-DD HH:mm").format("h:mm A");
                    let eventEndTime = moment(wpEvent.node.endDate,"YYYY-MM-DD HH:mm").format("h:mm A");
                    
                    return (
                    <div key={wpEvent.node.id} className="card flex-row col-md-3 p-0 border-0">
                        <div className="col border border-5 border-warning me-3">
                        <p className="text-center mx-auto w-50">
                            <span className="fs-4 text-uppercase">{eventMonth}</span> <span className="fs-1 fw-bold">{eventDay}</span>
                        </p>
                        </div>
                        <div className="card-body col-6 d-flex flex-column p-0">
                            <p className="lh-1 mt-3"><a className="link-dark fs-5 fw-bold stretched-link border-0" href={wpEvent.node.url}>{wpEvent.node.title}</a></p>
                            <p className="fs-4 mt-auto">{eventStartTime} - {eventEndTime}</p>
                        </div>
                    </div>)
                })}
            </div></div>
            
        </div>
        </div>
    </Layout>
    )
}

export default IndexPage

export const query = graphql`
    query {
      allNodePage(sort: {fields: [title], order: ASC}) {
        edges {
          node {
            title
            drupal_id
            path {
              alias
            }
            status
          }
        }
      }
      programs: allNodeProgram(sort: {fields: [title], order: ASC}) {
        edges {
          node {
            drupal_id
            drupal_internal__nid
            title
            path {
              alias
            }
            status
          }
        }
      }
      events: allWpEvent(
        filter: {isPast: {eq: false}}
        sort: {fields: startDate, order: ASC}
        limit: 4
      ) {
        edges {
          node {
            id
            title
            startDate
            endDate
            url
          }
        }
      }
    }
`