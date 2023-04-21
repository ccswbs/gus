import React from 'react';
import { graphql } from 'gatsby';
import Layout from 'components/layout';
import Seo from 'components/seo';
import InlineImage from 'components/shared/inlineImage';

export default ({data}) => {
	const pageData = data.articles.edges[0].node;
	const pageTitle = pageData.title;
	const body = (pageData.body !== null ? pageData.body.processed:``);
	const bodyInline = InlineImage(body); 

	return (
		<Layout>
			<Seo title={pageTitle} keywords={[`gatsby`, `application`, `react`]} />
			<div className="container page-container">
                <div className="row site-content">
                    <div className="content-area">
                        <h1>{pageTitle}</h1>
						<div className ="clearfix">
							<div>{bodyInline}</div>
						</div>
                    </div>
                </div>
              </div>
		</Layout>
	)
}

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
		  	}
		}
	}
  }
`