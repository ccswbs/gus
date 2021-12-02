import { graphql, Link } from 'gatsby';
import Layout from '../components/layout';
import React from 'react';

const SitePage = ({pageContext, data }) => {
  return (
    <Layout>
        <div className="container page-container">
            <h1>Sitemap</h1>
            
            <h2>Pages for {pageContext.searchfilt}</h2>
            <ul>
                {data.allNodePage.edges.map((edge, index) => (
                    <li key={index}><Link to={edge.node.path.alias}>{edge.node.title}</Link></li>
                ))}
            </ul>

        </div>
    </Layout>
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
