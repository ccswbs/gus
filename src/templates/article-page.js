import React from 'react';
import { graphql } from 'gatsby';
import Layout from 'components/layout';
import Seo from 'components/seo';
import InlineImage from 'components/shared/inlineImage';

const ArticlePage = ({data}) => {
	const pageData = data.articles.edges[0].node;
	const pageTitle = pageData.title;
	const author = pageData.field_news_author;
	const newsCategory = pageData.relationships.field_news_category;
	const body = (pageData.body !== null ? pageData.body.processed:``);
	const bodyInline = InlineImage(body); 
console.log(newsCategory);
	return (
		<Layout>
			<Seo title={pageTitle} keywords={[`gatsby`, `application`, `react`]} />
			<div className="container page-container">
                <div className="row site-content">
                    <div className="content-area">
                        <h1>{pageTitle}</h1>
						<p>{author}</p>
						<div className ="clearfix">
							<div>{bodyInline}</div>
						</div>
                    </div>
                </div>
              </div>
		</Layout>
	)
}

export default ArticlePage;

export const query = graphql`
  query ($id: String) {
	articles: allNodeArticle(filter: {id: {eq: $id}}) {
		edges {
			node {
				drupal_id
				title
				body {
					processed
				}
				field_news_author
				relationships {
					field_news_category {
					  name
					}
					field_tags {
					  ... on taxonomy_term__tags {
						id
						name
					  }
					}
				}
		  	}
		}
	}
  }
`