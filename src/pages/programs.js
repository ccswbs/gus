import { graphql} from 'gatsby';
import Layout from 'components/layout';
import React from 'react';
import Seo from 'components/seo';
import 'styles/programsList.css';

const ProgramsPage = ({ data }) => (
    <Layout>
        <div className="container page-container">
            <div className="site-content">
                <h1>Programs</h1>       
                <p>The University of Guelph is a comprehensive university offering a wide variety of programs and specialties. From general arts, commerce and science degrees, to unique programs in indigenous environmental science, veterinary technology, bio-resource management and one health. Explore everything your future can be at the University of Guelph.</p>     
                <br/>
                <div id="program-list" className="row row-cols-1 row-cols-md-4 g-4 mb-5">
                    {data.allNodeProgram.edges.map((edge, index) => (
                      edge.node.status=== true && <div className="col">
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

export function Head () {
  return (
    <Seo title="Program List" description={[`University of Guelph Programs`]} />
  )
}

export const query = graphql`{
  allNodeProgram(sort: {title: ASC}) {
    edges {
      node {
        drupal_id
        drupal_internal__nid
        title
        path {
          alias
        }
        status
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
}`