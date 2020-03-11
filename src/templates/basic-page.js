import React from 'react'
import { graphql } from "gatsby"
import Layout from '../components/layout'

//import Img from "gatsby-image"
//import SEO from '../components/seo'

export default ({data}) => {
	const page = data.allNodePage.edges[0].node
	return (
		<Layout>
			<>
			<div id="content" class="row row-with-vspace site-content" dangerouslySetInnerHTML={{ __html: page.body.value }} />
			</>	
		</Layout>
	)
}

//export default BasicPage

export const query = graphql`
  query ($alias: String!) {
	allNodePage(filter: {path: {alias: {eq: $alias}}}) {
		edges {
		  node {
			title
			path {
			  alias
			}
			field_imageurl {
			  uri
			}
			body {
			  value
			}
		  }
		}
	  }
	}
`