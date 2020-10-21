import { graphql, Link } from 'gatsby';
import Grid from '../components/grid';
import GridCell from '../components/gridCell';
import { Helmet } from 'react-helmet';
import Layout from '../components/layout';
import React from 'react';
import SEO from '../components/seo';

export default ({data}) => {
	let pageData;
	let topicData;

	// set data
	if (data.topics.edges[0] !== undefined) { topicData = data.topics.edges[0].node; }
	if (data.pages.edges !== undefined) { pageData = data.pages.edges; }

	// set landing page details
	const title = topicData.name;
	const body = (topicData.description !== null ? topicData.description.processed:``);

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
				<Grid>
					{pageData.map((page)  => {
						let headerImage = (page.node.relationships.field_image !== null ? page.node.relationships.field_image :``);
						let altText = (page.node.field_image !== null ? page.node.field_image.alt :``);

						return(
							<GridCell key={page.node.drupal_id} >
								<Link to={page.node.fields.alias.value}>{page.node.title}</Link>
							</GridCell>
							)
						})}
				</Grid>
			</div>
		</Layout>
	)
}

export const query = graphql`
  query ($id: String) {
	topics: allTaxonomyTermTopics(filter: {id: {eq: $id}}) {
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
	
	pages: allNodePage(filter: {fields: {tags: {in: [$id] }}}) {
		edges {
		  node {
			drupal_id
			title
			field_image {
			  alt
			}
			fields {
				alias {
					value
				}
			}
			relationships {
			  field_image {
				localFile {
				  childImageSharp {
					fluid(maxWidth: 1920) {
					  originalImg
					  ...GatsbyImageSharpFluid
					}
				  }
				  extension
				}
			  }
			}
		  }
		}
	  }

  }
`