import React from 'react';
import { graphql } from 'gatsby';
import Layout from '../components/layout';
import SEO from '../components/seo';

export default ({data}) => {
	const tagData = data.tags.edges[0].node;
	const title = tagData.name;
	const body = (tagData.description !== null ? tagData.description.processed:``);
	return (
		<Layout>
			<SEO title={title} keywords={[`gatsby`, `application`, `react`]} />
			<h1>{title}</h1>
			<div dangerouslySetInnerHTML={{ __html: body}} />
		</Layout>
	)
}

export const query = graphql`
  query ($id: String) {
	tags: allTaxonomyTermTags(filter: {id: {eq: $id}}) {
		edges {
			node {
				drupal_id
				drupal_internal__tid
				field_generate_page
				name
				description {
					processed
				}
		  	}
		}
	}
  }
`