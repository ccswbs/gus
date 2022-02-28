import PropTypes from 'prop-types';
import React from 'react';
import Grid from 'components/shared/grid';
import GridCell from 'components/shared/gridCell';
import { Link } from 'gatsby';
import { contentExists } from 'utils/ug-utils';

function RelatedPages (props) {
    if(contentExists(props.pageData) && props.pageData.length !== 0){
        if(props.displayType === 'grid') {

            return (
                <React.Fragment>
                    {props.pageData.map (paragraph  => {
                        if(contentExists(paragraph.relationships.field_list_pages)){
                            let relatedPages = paragraph.relationships.field_list_pages;
                            return(
                                <Grid key={paragraph.drupal_id}>
                                    {relatedPages.map(page => {
                                    const image = (contentExists(page.relationships.field_hero_image)) ? page.relationships.field_hero_image.relationships.field_media_image : null;
                                    const imageFile = (contentExists(image)) ? <img src={image.localFile.childImageSharp.resize.src} alt="" /> : null;

                                    return <GridCell key={page.drupal_id} 
                                                url={page.fields.alias.value} 
                                                image={imageFile}
                                                heading={page.title}
                                                headingLevel="h3" />
                                    })}
                                </Grid>
                            )
                        }
                        return null;
                    })}
                </React.Fragment>
            )
        }else {

            return (
                <React.Fragment>
                    {props.pageData.map (paragraph  => {
                        if(contentExists(paragraph.relationships.field_list_pages)){
                            let relatedPages = paragraph.relationships.field_list_pages;
                            return(
                                <ul key={paragraph.drupal_id}>
                                    {relatedPages.map(page => {
                                    return <li key={page.drupal_id} >
                                            <Link to={page.fields.alias.value}>{page.title}</Link>
                                        </li>
                                    })}
                                </ul>
                            )
                        }
                        return null;
                    })}
                </React.Fragment>
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
