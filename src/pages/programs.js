import { graphql, Link } from 'gatsby';
import Layout from '../components/layout';
import React from 'react';
import Seo from '../components/seo';

const IndexPage = ({ data }) => (
    <Layout>
        <Seo title="Home" keywords={[`gatsby`, `application`, `react`]} />
        <div className="container page-container">
            <h1>Gatsby UG Starter Theme</h1>
            <p>The University of Guelph, and everyone who studies here, explores here, teaches here and works here, is committed to one simple purpose: To Improve Life.</p>

            <h2>Programs</h2>
            <ul>
                {data.programs.edges.map((edge, index) => (
                  <div>
                    <li key={index}><Link to={edge.node.path.alias}>{edge.node.title}</Link></li>
                    {console.log(edge.node)}
                    <span>{edge.node.relationships.field_program_acronym.name}</span>
                  </div>
                ))}
            </ul>            
        </div>
    </Layout>
)

export default IndexPage

export const query = graphql`
    query {
      programs: allNodeProgram {
        edges {
          node {
            drupal_id
            drupal_internal__nid
            title
            path {
              alias
            }
            relationships {
              field_program_acronym {
                name
              }
            }
            field_program_overview {
              processed
            }
          }
        }
      }        
    }
`