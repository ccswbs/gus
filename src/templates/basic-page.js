import React from 'react'
import { graphql } from "gatsby"
import Layout from '../components/layout'
import SEO from '../components/seo'

export default ({data}) => {
	const pageData = data.pages.edges[0].node;
	const title = pageData.title;
	const body = (pageData.body !== null ? pageData.body.value:``);
	return (
		<Layout>
			<SEO title={title} keywords={[`gatsby`, `application`, `react`]} />
			<h1>{title}</h1>
			<div dangerouslySetInnerHTML={{ __html: body}} />
		</Layout>
	)
}

//export default BasicPage

export const query = graphql`
  query ($id: String) {
	pages: allNodePage(filter: {id: {eq: $id}}) {
		edges {
			node {
				drupal_id
				title
				path {
					alias
				}
				body {
					value
				}
		  	}
		}
	}
  }
`