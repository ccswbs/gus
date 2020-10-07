import React from 'react';
import PropTypes from 'prop-types';
import Img from 'gatsby-image';
import { contentIsNullOrEmpty, setHeadingLevel } from '../utils/ug-utils.js';
import '../styles/news.css';

function NewsGrid (props) {
    let Heading = setHeadingLevel(props.headingLevel);
    let categoryColours = ['blue','red'];

	if (!contentIsNullOrEmpty(props.newsData)) {
		const newsItems  = () => props.newsData.map((newsItem, index) => {
			let title = newsItem.node.title;
            let image = newsItem.node.relationships.field_image;
            let category = newsItem.node.relationships.field_news_category;

			return <div key={newsItem.node.drupal_id} className="col-md-3 col-sm-6 content-area">
                <a href="#">
                    {image && <div className="img-container"><Img fluid={image.localFile.childImageSharp.fluid} alt={newsItem.node.relationships.field_image.alt} /></div>}
                    <h4>{title}</h4>
                    <p className="category">{category}</p>
                </a>
			</div>
		})

		return (<div className="full-width-container bg-light news">
                    <div className="container page-container">
                        <section className="row row-with-vspace site-content">
                            <div className="col-md-12 content-area">
                                <Heading>{props.heading}</Heading>
                            </div>
                            {newsItems()}
                        </section>
                    </div>
                </div>
                )

	} else {
		return null
	}
}

NewsGrid.propTypes = {
	newsData: PropTypes.array,
}

NewsGrid.defaultProps = {
    newsData: null,
}

export default NewsGrid