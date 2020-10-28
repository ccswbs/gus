import PropTypes from 'prop-types';
import React from 'react';
import Grid from './grid';
import GridCell from './gridCell';
import Img from 'gatsby-image';
import { Link } from 'gatsby';
import { contentIsNullOrEmpty } from '../utils/ug-utils';

function RelatedPages (props) {

    if(!contentIsNullOrEmpty(props.pageData) && props.pageData.length !== 0){
        if(props.displayType === 'grid') {
            
            return (
                <Grid>
                    {props.pageData.map (paragraph  => {
                        if(!contentIsNullOrEmpty(paragraph.relationships.field_list_pages)){
                            let relatedPages = paragraph.relationships.field_list_pages;
                            
                            return(relatedPages.map(page => {
                                let image = (!contentIsNullOrEmpty(page.relationships.field_hero_image)) ? page.relationships.field_hero_image.relationships.field_media_image : null;
                                
                                return <GridCell key={page.drupal_id}>
                                        <Link to={page.fields.alias.value}>
                                            {image && <div className="img-container"><Img fluid={image.localFile.childImageSharp.fluid} alt="" /></div>}
                                            <span className="h3">{page.title}</span>
                                        </Link>
                                    </GridCell>
                                })
                            )
                        }
                        return null;
                    })}
                </Grid>
            )
        }else {

            return (
                <ul>
                    {props.pageData.map (paragraph  => {
                        if(!contentIsNullOrEmpty(paragraph.relationships.field_list_pages)){
                            let relatedPages = paragraph.relationships.field_list_pages;
                            return(relatedPages.map(page => {
                                return <li key={page.drupal_id} >
                                        <Link to={page.fields.alias.value}>{page.title}</Link>
                                    </li>
                                })
                            )
                        }
                        return null;
                    })}
                </ul>
            )
        }
    }

    return null;

}

RelatedPages.propTypes = {
    pageData: PropTypes.array,
    displayType: PropTypes.string,
}
  
RelatedPages.defaultProps = {
    pageData: ``,
    displayType: `list`,
  }

export default RelatedPages
