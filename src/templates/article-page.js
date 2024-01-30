import React from 'react';
import { graphql } from 'gatsby';
import CustomFooter from 'components/shared/customFooter';
import { contentExists } from 'utils/ug-utils';
import Hero from 'components/shared/hero'; 
import InlineImage from 'components/shared/inlineImage';
import Layout from 'components/layout';
import Seo from 'components/seo';

function ListAsButtons (props) {
	let ButtonToDisplay = props
	return (
		<React.Fragment>
			<span><a href="" className='btn btn-outline-info'>{ButtonToDisplay} </a>{" "}</span>
		</React.Fragment>
	)
}
const ArticlePage = ({data}) => {
	console.log(data, "data")
	const pageData = data.articles.edges[0].node;
	const pageTitle = pageData.title;
	const author = (contentExists(pageData.field_news_author))?pageData.field_news_author: null;
	const displayDate = (contentExists(pageData.field_publish_date))? pageData.field_publish_date: null;
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
						<p>{author && <><strong>By </strong>{author}<br/></>}</p>
						<div className="row">
							<div className="col-md-9 col-12 col">
								<div className ="clearfix">
									<div>{bodyInline}</div>
								</div>														
							</div>
							<div className="col-md-3 col-12">
								<p><strong>News Categories</strong></p>
								{pageData.relationships.field_news_category.map (newsCategory =>{return ListAsButtons(newsCategory.name)} )}
								<p>
									{displayDate && <><strong>Posted </strong> {displayDate}</>}<br/>
									{updatedDate && <><strong>Updated </strong>{updatedDate}</>}<br/>
									{imageCredit && <><strong>Lead Image </strong>{imageCredit}</>}
								</p>
								<p><strong>News Topics</strong></p>
								{pageData.relationships.field_news_topics.map (newsTopic => { return ListAsButtons(newsTopic.name)})}
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

export const query = graphql`
  query ($id: String, $tid: [String]) {
	articles: allNodeArticle(filter: {id: {eq: $id}}) {
		edges {
			node {
				drupal_id
				title
				body {
					processed
				}
				field_news_author
				field_lead_image
				field_publish_date (formatString: "MMMM DD, YYYY")
				changed (formatString: "MMMM DD, YYYY")
				relationships {
					field_news_category {
					  name
					  relationships {
						parent {
						  name
						}
					  }
					}
					field_news_topics {
						name
					}
				}
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