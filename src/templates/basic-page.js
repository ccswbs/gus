import React from 'react';
import Layout from '../components/layout';
import { Helmet } from 'react-helmet';
import SEO from '../components/seo';
import Hero from '../components/hero';
import RelatedPages from '../components/relatedPages';
import { graphql } from 'gatsby';

export default ({data}) => {

	const pageData = data.pages.edges[0].node;
	const title = pageData.title;
	const body = (pageData.body !== null ? pageData.body.processed:``);
	const imageData = data.images.edges;
	let relatedPageData;

	if (pageData.relationships.field_related_content !== undefined) { relatedPageData = pageData.relationships.field_related_content; }
	
	return (
		<Layout>
			<Helmet bodyAttributes={{
				class: 'basic-page'
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
			
			{ /**** Body content ****/ }
			<div className="container page-container">
				<div className="row row-with-vspace site-content">
					<section className="col-md-9 content-area">
						<div dangerouslySetInnerHTML={{ __html: body}} />

						<RelatedPages pageData={relatedPageData} displayType={'list'} />
					</section>
				</div>
			</div>
			
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
		  body {
			processed
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
	images: allMediaImage(filter: {relationships: {node__page: {elemMatch: {id: {eq: $id}}}}}) {
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