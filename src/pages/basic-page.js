import React from "react"
import { graphql } from "gatsby"
import Layout from '../components/layout'
//import Img from "gatsby-image"
//import SEO from '../components/seo'

const BasicPage = ({data}) => (
<Layout>
	<div>
      <h1>Basic Page Content</h1>
	      { data.allNodePage.edges.map(({ node }) => (
      <div>
        <h3>{ node.title }</h3>
        <div dangerouslySetInnerHTML={{ __html: node.body.value }} />		
		<div><img src={node.field_imageurl.uri} alt="" /></div>
      </div>
    ))}
	</div>
	</Layout>
)

export default BasicPage

export const query = graphql`
  query allNodePage {
    allNodePage {
      edges {
        node {
          id
          title
          body {
            value
            format
            processed
            summary
          }
		  field_imageurl {
            uri 
          } 
		}
      }
    }
  }
`