import React from "react"
import { graphql } from "gatsby"
import Img from "gatsby-image"


export default ({ data }) => (
    
    <div> 
    <h1>Student Profiles</h1>  
         
    {data.allNodeStudentProfile.nodes.map(node => (
      <div>

          {node.title} <br></br>
          <Img fluid={node.relationships.field_picture.localFile.childImageSharp.fluid} alt="" />
          
          <p dangerouslySetInnerHTML={{ __html: node.body.value }} />
          
       </div> 
    ))}
    </div>
)

export const query = graphql`
  query {
    allNodeStudentProfile {
        nodes {
          body {
            value
            processed
          }
          title
          field_program_year
          field_picture {
            alt
          }
          relationships {
            field_picture {
              localFile {
                url
                childImageSharp {
                  fluid(maxWidth: 400, maxHeight: 250) {
                    originalImg
                    ...GatsbyImageSharpFluid
                  }
                }
              }
            }
          }
        }
    }
  }
`