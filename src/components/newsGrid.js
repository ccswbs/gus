import Grid from './grid';
import GridCell from './gridCell';
import Img from 'gatsby-image';
import React from 'react';
import PropTypes from 'prop-types';
import { contentExists, getNextHeadingLevel } from '../utils/ug-utils.js';

function NewsGrid (props) {
    let nextHeadingLevel = getNextHeadingLevel(props.headingLevel);
    getNextHeadingLevel(props.headingLevel);

	if (contentExists(props.newsData)) {
		const newsItems  = () => props.newsData.map((newsItem) => {
			const title = newsItem.node.title;
            const image = newsItem.node.relationships.field_hero_image.relationships.field_media_image;
            const categories = Array.prototype.map.call(newsItem.node.relationships.field_news_category, s => s.name).join(', ');
            const categoryElement = (contentExists(categories)) ? <p className="category">{categories}</p> : null;

			return <GridCell key={newsItem.node.drupal_id} 
                        url={newsItem.node.fields.alias.value} 
                        image={<Img fluid={image.localFile.childImageSharp.fluid} alt="" />}
                        heading={title}
                        headingLevel={nextHeadingLevel} 
                        text={categoryElement} />
		})

		return (<Grid heading={props.heading} headingLevel={props.headingLevel}>
                    {newsItems()}
                </Grid>
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