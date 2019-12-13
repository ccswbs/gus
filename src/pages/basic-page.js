import React, { Component, Fragment } from 'react'
import { graphql } from "gatsby"
import Layout from '../components/layout'

//import Img from "gatsby-image"
//import SEO from '../components/seo'

const BasicPage = ({data}) => (
	<Layout>
		{data.allNodePage.edges.map(({ node }) => (
			<>
			<div id="content" class="row row-with-vspace site-content" dangerouslySetInnerHTML={{ __html: node.body.value }} />		
			<img src={node.field_imageurl.uri} alt="" />
			</>	
		))}
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