import { graphql } from 'gatsby';
import { Helmet } from 'react-helmet';
import GridItems from '../components/griditems';
import Layout from '../components/layout';
import React from 'react';
import SEO from '../components/seo';
import Hero from '../components/hero';
import '../styles/program-page.css';

export default ({data}) => {
	let pageData;
	var gridItemsData;
	let imageData;


	// set data
	if (data.pages.edges[0] !== undefined) { pageData = data.pages.edges[0].node; }
	if (pageData.relationships.field_grid_items !== undefined) { gridItemsData = pageData.relationships.field_grid_items; }

	// set landing page details
	const title = pageData.title;
	const body = (pageData.body !== null ? pageData.body.processed:``);
	if (data.images.edges !== undefined) { imageData = data.images.edges; }


	return (
		<Layout>
			<Helmet bodyAttributes={{
				class: 'landing-page'
			}}
			/>
			<SEO title={title} keywords={[`gatsby`, `application`, `react`]} />
			{ /**** Header and Title ****/ }
			<div id="rotator">
				<Hero imgData={imageData} />
				<div className="container ft-container">
					<h1 className="fancy-title">{title}</h1>
				</div>
			</div>
			
			
			<div className="container page-container">
				<div className="row row-with-vspace site-content">
					{ /**** Body content ****/ }
					<section className="col-md-9 content-area">
						<div dangerouslySetInnerHTML={{ __html: body}} />
					</section>
				</div>
			</div>

			
			{ /**** Grid Items content ****/ }
			<GridItems pageData={gridItemsData}/>
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
				changed
				drupal_id
				drupal_internal__nid
				title
				fields {
					alias {
						value
					}
				}

				relationships {
					field_grid_items{
						drupal_id
						
						relationships {
							field_grid_image {
								relationships {
									field_media_image {
										localFile {
											publicURL
												childImageSharp {
												resize (width: 400, height: 300, cropFocus: ENTROPY) {
													src
												}
											}
										}	
									}
								}
							}
							field_grid_page {
								... on node__page {
									drupal_id
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

	images: allMediaImage(filter: {relationships: {node__landing_page: {elemMatch: {id: {eq: $id}}}}}) {
		edges {
		  node {
			drupal_id
			field_media_image {
				  alt
			}
			relationships {
			  field_media_image {
				localFile {
				  childImageSharp {
					fluid(maxWidth: 1920) {
					  originalImg
					  ...GatsbyImageSharpFluid
					}
				  }
				}
			  }
			  field_tags {
			  __typename
			  ... on TaxonomyInterface {
				  name
				}
			  }
			}
		  }
		}
	  }

	}

`