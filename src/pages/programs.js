import { graphql} from 'gatsby';
import Layout from '../components/layout';
import React from 'react';
import Seo from '../components/seo';
import '../styles/programsList.css';

const ProgramsPage = ({ data }) => (
    <Layout>
        <Seo title="Program List" description={[`Univeristy of Guelph Programs`]} />
        <div className="container page-container">
            <div id="content" className="site-content">
                <h1>Programs</h1>            
                <div id="program-list" className="row row-cols-1 row-cols-md-2 g-4 mb-5">
                    {data.allNodeProgram.edges.map((edge, index) => (
                      <div className="col">
                          <div className="card h-100">
                            <h2 key={index}><a className="stretched-link" href={edge.node.path.alias}>{edge.node.title}</a></h2>
                            <div>{edge.node.relationships.field_program_acronym.name}</div>
                          </div>
                      </div>
                    ))}
                </div>
            </div>
        </div>
    </Layout>
)

export default ProgramsPage

export const query = graphql`
    query {
      allNodeProgram(sort: {fields: [title], order: ASC}) {
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