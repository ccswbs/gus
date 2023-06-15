import React from 'react';
import { graphql } from 'gatsby';
import Layout from 'components/layout';
import Seo from 'components/seo';
import InlineImage from 'components/shared/inlineImage';
import CustomFooter from 'components/shared/customFooter';

function ListAsButtons (props) {
	let ButtonToDisplay = props
	console.log(props)
	return (
		<React.Fragment>
		<span><a href="" className='btn btn-outline-info'>{ButtonToDisplay} </a>{" "}</span>
	
	</React.Fragment>
	)
}
const ArticlePage = ({data}) => {
	const pageData = data.articles.edges[0].node;
	const pageTitle = pageData.title;
	const author = pageData.field_news_author;
	const displayDate = "Posted: " + pageData.field_publish_date;
	const updatedDate = "Updated: " + pageData.changed;
	// const newsCategory = pageData.relationships.field_news_category
	const body = (pageData.body !== null ? pageData.body.processed:``);
	const bodyInline = InlineImage(body); 
	// const newsTopics = pageData.relationships.field_news_topics;
	const footer = data.footer.edges;

console.log(pageData.relationships.field_news_category, "Cat");
console.log(pageData.relationships.field_news_topics, "Topic");
	return (
		<Layout>
			<Seo title={pageTitle} keywords={[`gatsby`, `application`, `react`]} />
			<div className="container page-container">
                <div className="row site-content">
                    <div className="content-area">
                        <h1>{pageTitle}</h1>
						{pageData.relationships.field_news_category.map (newsCategory =>{return ListAsButtons(newsCategory.name)} )}
						<p>{author && <>By: {author}<br/></>}
						{displayDate}<br/>
						{updatedDate}</p>
						{pageData.relationships.field_news_topics.map (newsTopic => { return ListAsButtons(newsTopic.name)})}
						<div className ="clearfix">
							<div>{bodyInline}</div>
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
	footer: allNodeCustomFooter (filter: {fields: {tags: {in: $tid}}}){
		edges {
			node {
			...CustomFooterFragment
			}
		}
		}
  }
`