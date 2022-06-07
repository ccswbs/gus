import Grid from 'components/shared/grid';
import GridCell from 'components/shared/gridCell';
import { GatsbyImage, getImage } from "gatsby-plugin-image";
import React from 'react';
import PropTypes from 'prop-types';
import { getNextHeadingLevel } from 'utils/ug-utils.js';
import 'styles/news.css';

function NewsGrid (props) {
    let nextHeadingLevel = getNextHeadingLevel(props.headingLevel);
    getNextHeadingLevel(props.headingLevel);

	if (props.newsData) {
		const newsItems  = () => props.newsData.map((newsItem) => {
			const title = newsItem.node.title;
            const image = newsItem.node.relationships.field_hero_image.relationships.field_media_image;
            const categories = Array.prototype.map.call(newsItem.node.relationships.field_news_category, s => s.name).join(', ');
            const categoryElement = categories ? <p className="category">{categories}</p> : null;

			return (
                <GridCell key={newsItem.node.drupal_id} 
                            url={newsItem.node.fields.alias.value} 
                            image={<GatsbyImage image={getImage(image)} alt="" />}
                            heading={title}
                            headingLevel={nextHeadingLevel} 
                            text={categoryElement}
                            extraClasses="news-item" />
            );
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