import PropTypes from 'prop-types';
import React from 'react';
import LinksItems from './linksItems';

import { contentExists } from '../utils/ug-utils';

function LinksWidget (props) {




	const linksData = (contentExists(props.pageData.relationships.field_widgets))? props.pageData.relationships.field_widgets: null;
    return (
        <LinksItems pageData={linksData} heading={"Grid"} displayType={'grid'} headingLevel={'h2'} numColumns={4}/>
    )
}
LinksWidget.propTypes = {
    pageData: PropTypes.array,
    displayType: PropTypes.string,
	heading: PropTypes.string,
    headingLevel: PropTypes.string,
	numColumns: PropTypes.number,
}
LinksWidget.defaultProps = {
    pageData: ``,
	displayType: `list`,
	heading: ``,
    headingLevel: ``,
	numColumns: 4,

  }

export default LinksWidget