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
    }
`
