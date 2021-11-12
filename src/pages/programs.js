import { graphql, Link } from 'gatsby';
import Layout from '../components/layout';
import React from 'react';
import Seo from '../components/seo';
import '../styles/stats.css';

const IndexPage = ({ data }) => (
    <Layout>
      {console.log(data.allNodeProgram)}

      {console.log (data.allNodeProgram)}
        <Seo title="Program List" keywords={[`gatsby`, `application`, `react`]} />
        <div className="container page-container">
            <h1>Programs</h1>
            <dl className="card-group programsList">
                {data.allNodeProgram.edges.map((edge, index) => (
                  <dt className="uog-card">
                    <h2 key={index}><Link to={edge.node.path.alias}>{edge.node.title}</Link></h2>
                    <dd>{edge.node.relationships.field_program_acronym.name}</dd>
                    <dd>{edge.node.relationships.field_tags.map((tags, indexTags) => (
                      <span key={indexTags}>{tags.name}, </span>
                    ))}</dd>
                  </dt>
                ))}
            </dl>            
        </div>
    </Layout>
)

export default IndexPage

export const query = graphql`
    query {
      allNodeProgram {
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
              field_tags {
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