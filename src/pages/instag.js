import React from "react"
import { graphql, Link } from "gatsby"


export default ({ data }) => (
      

    <div> Hello world - instagram 
    
        
    {data.allInstaNode.edges.map(edge => (
      <p><img src={edge.node.original} alt="" width="250" height="250" /> {edge.node.caption} </p> 
    ))}
    

    </div>
  
)

export const query = graphql`
  query {
    allInstaNode(limit: 3) {
      edges {
        node {
          original
          caption
        }
      }
    }
  }
`