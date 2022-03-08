import PropTypes from 'prop-types';
import React from 'react';
import { graphql } from 'gatsby';


function accordionWidget (props) {
  
  return(
    props.pageData.relationships.field_accordion_block_elements.map((accordionData,j) => {
        return( <>
            <div className="panel-group panel-group-lists collapse in show" id={"accordionWidget"+props.pageData.drupal_id}>
                <div className="panel">
                    <div className="panel-heading">
                        <h4 className="panel-title">
                            <a data-toggle="collapse" data-parent={"#accordionWidget"+props.pageData.drupal_id} href={"#collapse"+j+props.pageData.drupal_id} className="collapsed" dangerouslySetInnerHTML={{__html: accordionData.field_accordion_block_title.processed}}></a>
                        </h4>
                    </div>
                    <div id={"collapse"+j+props.pageData.drupal_id} className="panel-collapse collapse in">
                        <div className="panel-body" dangerouslySetInnerHTML={{__html: accordionData.field_accordion_block_text.processed}}/>
                    </div>
                </div>
            </div>
        </>);
    } )
);
}

accordionWidget.propTypes = {
    pageData: PropTypes.object,
}
  
accordionWidget.defaultProps = {
    pageData: ``,
}

export default accordionWidget

export const query = graphql`
fragment AccordionSectionParagraphFragment on paragraph__accordion_section {
  drupal_id
  relationships {
    field_accordion_block_elements {
      drupal_id
      field_accordion_block_title {
        processed
      }
      field_accordion_block_text {
        processed
      }
    }
  }
}
fragment GeneralTextParagraphFragment on paragraph__general_text {
  drupal_id
  field_general_text {
    processed
  }
  relationships {
    field_section_column {
      name
    }
  }
} 
`