import React from 'react'
import { Helmet } from 'react-helmet';
import { graphql } from "gatsby"
import Img from 'gatsby-image';
import Layout from '../components/layout'
import SEO from '../components/seo'

export default ({data}) => {
	
	const pageData = data.pages.edges[0].node;
	const title = pageData.title;
	const body = (pageData.body !== null ? pageData.body.processed:``);
	const headerImage = (pageData.relationships.field_image !== null ? pageData.relationships.field_image :``);
	const altText = (pageData.field_image !== null ? pageData.field_image.alt :``);
	
	return (
		<Layout>
			<Helmet bodyAttributes={{
				class: 'basic-page'
			}}
			/>
			<SEO title={title} keywords={[`gatsby`, `application`, `react`]} />
			
			{ /**** Header and Title ****/ }
			<div id="rotator">
				{headerImage && altText ?  
					(<Img fluid={headerImage.localFile.childImageSharp.fluid} alt={altText} />)
					: null
                }				
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
		  field_image {
            alt
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