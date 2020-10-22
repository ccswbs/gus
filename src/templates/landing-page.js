import { graphql, Link } from 'gatsby';
import Grid from '../components/grid';
import GridCell from '../components/gridCell';
import { Helmet } from 'react-helmet';
import Layout from '../components/layout';
import React from 'react';
import SEO from '../components/seo';

export default ({data}) => {
	let pageData;

	// set data
	if (data.pages.edges[0] !== undefined) { pageData = data.pages.edges[0].node; }

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
			
			{ /**** Body content ****/ }
			<div className="container page-container">
				<div className="row row-with-vspace site-content">
					<section className="col-md-9 content-area">
						<div dangerouslySetInnerHTML={{ __html: body}} />
					</section>
				</div>
			</div>

			{ /**** Grid content ****/ }
			{/* <div className="container page-container">
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
			</div> */}
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
		  }
		}
	  }

  }
`