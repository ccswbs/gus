import { graphql} from 'gatsby';
import Layout from '../components/layout';
import React from 'react';
import Seo from '../components/seo';
import '../styles/programsList.css';

const ProgramsPage = ({ data }) => (
    <Layout>
      {data.allNodeProgram.edges.sort(function(a,b){
        var titleA =a.node.title, titleB = b.node.title;
        if (titleA < titleB)
          return -1;
        if (titleA > titleB)
          return 1;
        return 0;
      })}
        <Seo title="Program List" description={[`Univeristy of Guelph Programs`]} />
        <div className="container page-container">
            <h1>Programs</h1>
            <div className="card-group programsList">
                {data.allNodeProgram.edges.map((edge, index) => (
                  <div className="programsList-card card">
                    <h2 key={index}><a className = "stretched-link" href={edge.node.path.alias}>{edge.node.title}</a></h2>
                    <div>{edge.node.relationships.field_program_acronym.name}</div>
                  </div>
                ))}
            </div>            
        </div>
        <br/>
    </Layout>
)

export default ProgramsPage

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