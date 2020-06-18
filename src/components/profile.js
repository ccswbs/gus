import React from "react"
import { useStaticQuery, graphql } from 'gatsby'
import Img from "gatsby-image"

export default function Profile() {
  const data = useStaticQuery(
    graphql`
      query {
        allNodeStudentProfile {
            nodes {
                body {
                    value
                    processed
                }
                title
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
  )
  
  return (
    <div> 
    <h2>Student Profiles</h2>  
    
    {data.allNodeStudentProfile.nodes.map(node => (
        <div>
        {console.log(node)}

          {node.title} <br></br>
          <Img fluid={node.relationships.field_picture.localFile.childImageSharp.fluid} alt="" />
          
          <p dangerouslySetInnerHTML={{ __html: node.body.value }} />
          
          
      </div> 
    ))}
    
    
    </div>
  )
}

