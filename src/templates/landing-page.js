import { graphql } from 'gatsby';
import { Helmet } from 'react-helmet';
import GridItems from '../components/griditems';
import Layout from '../components/layout';
import React from 'react';
import RelatedPages from '../components/relatedPages';
import SEO from '../components/seo';
import Hero from '../components/hero';

export default ({data}) => {
	let pageData;
	let relatedPageData;
	let gridItemsData;


	// set data
	if (data.pages.edges[0] !== undefined) { pageData = data.pages.edges[0].node; }
	if (pageData.relationships.field_related_content !== undefined) { relatedPageData = pageData.relationships.field_related_content; }
	if (pageData.relationships.field_grid_items !== undefined) { gridItemsData = pageData.relationships.field_grid_items; }

	
	// set landing page details
	const imageData = data.images.edges;
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

			{ /**** Grid content ****/ }
			<RelatedPages pageData={relatedPageData} displayType={'grid'} />
			
			{ /**** Grid Items content ****/ }
			<GridItems pageData={gridItemsData} displayType={'grid'} />
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
						drupal_id
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
								

								relationships {
									field_hero_image {
										field_media_image {
										alt
										}
										relationships {
											field_media_image {
												localFile {
												url
												childImageSharp {
													resize(width: 400, height: 300, , cropFocus: CENTER) {
													src
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
					field_grid_items {
						drupal_id
						relationships {
							paragraph_type {
								drupal_id
								id
								relationships {
									paragraph__grid_items {
										drupal_id
										field_grid_link {
											title
											uri
										}
										relationships {
											field_grid_image {
												field_media_image {
												alt
												}
												relationships {
													field_media_image {
														localFile {
															id
															url
															childImageSharp {
																resize (width: 400, height: 300, cropFocus: CENTER) {
																src
																}
															}
														}
													}

												}
											}
											field_grid_page {
												... on node__page {
													id
													title
													drupal_id
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