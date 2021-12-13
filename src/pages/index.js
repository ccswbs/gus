import { graphql, Link } from 'gatsby';
import HeaderMenu from '../components/headerMenu'
import { Helmet } from 'react-helmet';
import Layout from '../components/layout';
//import Header from '../components/header'
import React from 'react';
import Seo from '../components/seo';

const IndexPage = ({ data }) => (
        <><Helmet><script defer src="https://www.uoguelph.ca/web-components/UofGWebComponents-dist.js"></script></Helmet>
        <HeaderMenu />
    <Layout>
        <Seo title="Home" />
        
        <div className="container page-container">
            <h1>Gatsby UG Starter Theme</h1>
            <p>The University of Guelph, and everyone who studies here, explores here, teaches here and works here, is committed to one simple purpose: To Improve Life.</p>
            <h2>Pages</h2>
            <ul>
                {data.allNodePage.edges.map((edge, index) => (
                    <li key={index}><Link to={edge.node.path.alias}>{edge.node.title}</Link> {edge.node.status === false ? "Unpublished" : ""}</li>
                ))}
            </ul>

            <h2>Programs</h2>
            <ul>
                {data.programs.edges.map((edge, index) => (
                    <li key={index}><Link to={edge.node.path.alias}>{edge.node.title}</Link> {edge.node.status === false ? "Unpublished" : ""}</li>
                ))}
            </ul>
        </div>
    </Layout></>
)

export default IndexPage

export const query = graphql`
    query {
      allNodePage {
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
      programs: allNodeProgram {
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