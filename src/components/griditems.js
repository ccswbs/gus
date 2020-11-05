import PropTypes from 'prop-types';
import React from 'react';
import Grid from './grid';
import GridCell from './gridCell';
import { Link } from 'gatsby';
import { contentExists } from '../utils/ug-utils';

function gridItems (props) {
console.log("log-gridItems");
console.log(props);

    if(contentExists(props.pageData) && props.pageData.length !== 0){
        if(props.displayType === 'grid') {
            return (
                <React.Fragment>
                    {props.pageData.map (paragraph  => {
                        if(contentExists(paragraph.relationships.field_grid_items)){
                            let gridItems = paragraph.relationships.field_grid_items;
                            return(
                                <Grid key={paragraph.drupal_id}>
                                    {gridItems.map(page => {
                                    const image = (contentExists(page.relationships.field_grid_items)) ? page.relationships.field_grid_items.relationships.field_media_image : null;
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
                        if(contentExists(paragraph.relationships.field_grid_items)){
                            let gridItems = paragraph.relationships.field_grid_items;
                            return(
                                <ul key={paragraph.drupal_id}>
                                    {gridItems.map(page => {
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

gridItems.propTypes = {
    pageData: PropTypes.array,
    displayType: PropTypes.string,
}
  
gridItems.defaultProps = {
    pageData: ``,
    displayType: `list`,
  }
export default gridItems
