import React from 'react';
import { graphql } from 'gatsby';
import CustomFooter from 'components/shared/customFooter';
import Hero from 'components/shared/hero'; 
import InlineImage from 'components/shared/inlineImage';
import Layout from 'components/layout';
import Seo from 'components/seo';

function contentExists(content) {
    if (content && !Array.isArray(content)) {
        return true;
    } else if (content && Array.isArray(content) && content.length > 0) {
        return true;
    }
	return false;
}
//**** for listing topics as buttions removed for now - but want to mainting the code here for future use. Along with the call below ****/
// function ListAsButtons (props) {
// 	let ButtonToDisplay = props
// 	return (
// 		<React.Fragment>
// 			<span><a href="" className='btn btn-outline-info'>{ButtonToDisplay} </a>{" "}</span>
// 		</React.Fragment>
// 	)
// }

const ArticlePage = ({data}) => {
	const pageData = data.articles.edges[0].node;
	const pageTitle = pageData.title;
	const displayDate = (contentExists(pageData.created))? pageData.created: null;
	const updatedDate = (contentExists(pageData.changed))? pageData.changed: null;
	const imageCredit = (contentExists(pageData.field_lead_image))? pageData.field_lead_image: null;
	const body = (contentExists(pageData.body)) ? pageData.body.processed:``;
	const bodyInline = InlineImage(body); 
	const footer = data.footer.edges;
	const imageData=data.images.edges;



	return (
		<Layout>
			<Seo title={pageTitle} keywords={[`gatsby`, `application`, `react`]} />
			{/**** Header and Title ****/ }
			{(imageData?.length > 0) &&
			<div className={imageData?.length > 0 ? "" : "no-thumb"} id="rotator">
				<Hero imgData={imageData} />

			</div>}
			<div className="container page-container">
                <div className="row site-content">
                    <div className="content-area">
						<h1>{pageTitle}</h1>
						<div className="row">
							<div className="col-md-9 col-12 col">
								<div className ="clearfix">
									<div>{bodyInline}</div>
								</div>														
							</div>
							<div className="col-md-3 col-12">
								<p><strong>News Categories</strong></p>
								{/* {pageData.relationships.field_news_category.map (newsCategory =>{return ListAsButtons(newsCategory.name)} )} */}
								{pageData.relationships.field_news_category.map (newsCategory =>{return <div>{newsCategory.name}</div>} )}<br/>
								<p>
									{displayDate && <><strong>Posted </strong> {displayDate}</>}<br/>
									{updatedDate && <><strong>Updated </strong>{updatedDate}</>}<br/>
									{imageCredit && <><strong>Lead Image </strong>{imageCredit}</>}
								</p>
							</div>
						</div>
                    </div>
                </div>
              </div>

		  	{ /**** Custom Footer content ****/}
			{footer?.length > 0 &&
			<CustomFooter footerData={footer[0]} />}
		</Layout>
	)
}

export default ArticlePage;

// Note: the ", field_domain_access: {elemMatch: {drupal_internal__target_id: {eq: "api_ovc_uoguelph_dev"}}}" in the filter will be removed when the live site is cleaned up of all non-ovc news content
//       This is to enable the removial of the ovc domain.

export const query = graphql`
  query ($id: String, $tid: [String]) {
	articles: allNodeArticle(filter: {id: {eq: $id}, field_domain_access: {elemMatch: {drupal_internal__target_id: {eq: "api_ovc_uoguelph_dev"}}}}) {
		edges {
			node {
				drupal_id
				title
				body {
					processed
				}
				field_news_author
				field_lead_image
				created (formatString: "MMMM DD, YYYY")
				changed (formatString: "MMMM DD, YYYY")
				relationships {
					field_news_category {
					  name
					}
				}
				field_domain_access {
					drupal_internal__target_id}
		  	}
		}
	}
	images: allMediaImage(filter: {relationships: {node__article: {elemMatch: {id: {eq: $id}}}}}) {
		edges {
		  node {
			drupal_id
			...HeroImageFragment
		  }
		}
	  }
	footer: allNodeCustomFooter (filter: {fields: {tags: {in: $tid}}}){
		edges {
			node {
			...CustomFooterFragment
			}
		}
		}
  }
`