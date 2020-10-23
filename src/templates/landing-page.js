import { graphql, Link } from 'gatsby';
import Grid from '../components/grid';
import GridCell from '../components/gridCell';
import { Helmet } from 'react-helmet';
import Layout from '../components/layout';
import React from 'react';
import SEO from '../components/seo';
import { contentIsNullOrEmpty } from '../utils/ug-utils';

export default ({data}) => {
	let pageData;
	let relatedPageData;

	// set data
	if (data.pages.edges[0] !== undefined) { pageData = data.pages.edges[0].node; }
	if (pageData.relationships.field_related_content !== undefined) { relatedPageData = pageData.relationships.field_related_content; }

	// set landing page details
	const title = pageData.title;
	const body = (pageData.body !== null ? pageData.body.processed:``);

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
			
			
			<div className="container page-container">
				<div className="row row-with-vspace site-content">
					<section className="col-md-9 content-area">

						{ /**** Body content ****/ }
						<div dangerouslySetInnerHTML={{ __html: body}} />

						{ /**** Grid content ****/ }
						<Grid>
							{relatedPageData.map (paragraph  => {
								if(!contentIsNullOrEmpty(paragraph.relationships.field_list_pages)){
									let relatedPages = paragraph.relationships.field_list_pages;
									
									return( relatedPages.map(page => {
											// let featureImage = (page.node.relationships.field_image !== null ? page.node.relationships.field_image :``);
											// let altText = (page.node.field_image !== null ? page.node.field_image.alt :``);

											return <GridCell key={page.drupal_id} >
													<Link to={page.fields.alias.value}>{page.title}</Link>
												</GridCell>
											
										})
									)
								}
							})}
						</Grid>

					</section>
				</div>
			</div>
		</Layout>
	)
}

export const query = graphql`
	query ($id: String) {	
		pages: allNodeLandingPage(filter: {id: {eq: $id}}) {
			edges {
			node {
				body {
					processed
				}
				drupal_id
				title
				fields {
					alias {
						value
					}
				}

				relationships {
					field_related_content {
					  relationships {
						field_list_pages {
						  ... on node__page {
							drupal_id
							id
							title
							fields {
								alias {
									value
								}
							}
						  }
						}
					  }
					}
				}
				
			}
		}
	}

}
`