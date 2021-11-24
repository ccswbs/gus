import { graphql, Link } from 'gatsby';
import Layout from '../components/layout';
import React from 'react';
import Seo from '../components/seo';
import '../styles/programsList.css';

const ProgramsPage = ({ data }) => (
    <Layout>
      {console.log(data.allNodeProgram.edges)}
      {data.allNodeProgram.edges.sort(function(a,b){
        var titleA =a.node.title, titleB = b.node.title;
        if (titleA < titleB)
          return -1;
        if (titleA > titleB)
          return 1;
        return 0;
      })}
      {console.log (data.allNodeProgram.edges)}
        <Seo title="Program List" keywords={[`gatsby`, `application`, `react`]} />
        <div className="container page-container">
            <h1>Programs</h1>
            <div className="card-group programsList">
                {data.allNodeProgram.edges.map((edge, index) => (
                  <div className="programsList-card p">
                    <h2 key={index}><Link to={edge.node.path.alias}>{edge.node.title}</Link></h2>
                    <dd>{edge.node.relationships.field_program_acronym.name}</dd>
                    {/* <dd>{edge.node.relationships.field_tags.map((tags, indexTags) => (
                      <span key={indexTags}>{tags.name}, </span>
                    ))}</dd> */}
                  </div>
                ))}
            </div>            
        </div>
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