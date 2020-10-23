import PropTypes from 'prop-types';
import React from 'react';
import GridCell from './gridCell';
import GridParent from './gridParent';
import { Link } from 'gatsby';
import { contentIsNullOrEmpty } from '../utils/ug-utils';

function RelatedPages (props) {

    if(props.displayType === 'grid'){
        return (
            <GridParent>
                {!contentIsNullOrEmpty(props.pageData) && <>
                    {props.pageData.map (paragraph  => {
                        if(!contentIsNullOrEmpty(paragraph.relationships.field_list_pages)){
                            let relatedPages = paragraph.relationships.field_list_pages;
                            
                            return(relatedPages.map(page => {
                                // let featureImage = (page.node.relationships.field_image !== null ? page.node.relationships.field_image :``);
                                // let altText = (page.node.field_image !== null ? page.node.field_image.alt :``);

                                return <GridCell key={page.drupal_id} >
                                        <Link to={page.fields.alias.value}>{page.title}</Link>
                                    </GridCell>
                                })
                            )
                        }
                        return null;
                    })}
                </>}
            </GridParent>
        )
    }else {
        return null;
    }

}

RelatedPages.propTypes = {
    pageData: PropTypes.array,
    displayType: PropTypes.string,
}
  
RelatedPages.defaultProps = {
    pageData: ``,
    displayType: `grid`,
  }

export default RelatedPages
