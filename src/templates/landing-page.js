import React from 'react';
import { Helmet } from 'react-helmet';
import { graphql } from 'gatsby';
import Layout from '../components/layout';
import SEO from '../components/seo';

export default ({data}) => {
	const tagData = data.tags.edges[0].node;
	const title = tagData.name;
	const body = (tagData.description !== null ? tagData.description.processed:``);

	return (
		<Layout>
			<Helmet bodyAttributes={{
				class: 'landing-page'
			}}
			/>
			<SEO title={title} keywords={[`gatsby`, `application`, `react`]} />
			{ /**** Header and Title ****/ }
			<div id="rotator">
				<div className="container ft-container">
					<h1 className="fancy-title">{title}</h1>
				</div>
			</div>
			
			{ /**** Body content ****/ }
			<div className="container page-container">
				<div className="row row-with-vspace site-content">
					<section className="col-md-9 content-area">
						<div dangerouslySetInnerHTML={{ __html: body}} />
					</section>
				</div>
			</div>

			{ /**** Grid content ****/ }
			<div className="container page-container">

			</div>

		</Layout>
	)
}

export const query = graphql`
  query ($id: String) {
	tags: allTaxonomyTermTopics(filter: {id: {eq: $id}}) {
		edges {
			node {
				drupal_id
				drupal_internal__tid
				name
				description {
					processed
				}
		  	}
		}
	}
  }
`