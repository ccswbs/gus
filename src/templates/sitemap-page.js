import { graphql, Link } from 'gatsby';
import Layout from 'components/layout';
import React from 'react';

const SitePage = ({pageContext, data }) => {
  return (
    <Layout>
        <div className="container page-container">
            <h1>Sitemap</h1>
            <p>The University of Guelph, and everyone who studies here, explores here, teaches here a
nd works here, is committed to one simple purpose: To Improve Life.</p>
            <h2>Pages for {pageContext.searchfilt}</h2>
            <ul>
                {data.allNodePage.edges.map((edge, index) => (
                    <li key={index}><Link to={edge.node.path.alias}>{edge.node.title}</Link></li>
                ))}
            </ul>

        </div>
    </Layout>
  )
}

export default SitePage

export const query = graphql`
    query filterAllPage($searchfilt: String) {
        allNodePage(filter: {path: {alias: {regex: $searchfilt }}}) {
        edges {
          node {
            title
            drupal_id
            path {
              alias
            }
          }
        }
      }
    }
`
