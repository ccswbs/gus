import PropTypes from 'prop-types';
import React from 'react';
import { graphql } from 'gatsby';
import { contentExists } from 'utils/ug-utils';

const accordionWidget = (props) => {
    let accordionData = props.pageData.relationships.field_accordion_block_elements;
    let stayOpen = props.pageData.field_accordion_stay_open;
    let dataParent = ("#accordion" + props.pageData.drupal_id);

    if (contentExists(accordionData)) {
        return <>
            <div className="accordion" id={"accordion" + props.pageData.drupal_id}>
            {accordionData.map(item =>
                <div className="accordion-item">
                    <h2 className="accordion-header" id={"heading" + item.drupal_id}>
                        <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target={"#part" + item.drupal_id} aria-expanded="true" aria-controls={"part" + item.drupal_id}>
                            {contentExists(item.field_accordion_title) ? item.field_accordion_title : "Read More"}
                        </button>
                    </h2>
                    <div {...(stayOpen ? {} : {["data-bs-parent"]:dataParent})} id={"part" + item.drupal_id} className="accordion-collapse collapse" aria-labelledby={"heading" + item.drupal_id}>            
                        <div className="accordion-body" dangerouslySetInnerHTML={{__html: item.field_accordion_block_text.processed}} />
                    </div>
                </div>
            )}
            </div>
        </>
    }
    return null;
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
    field_accordion_stay_open
    relationships {
      field_accordion_block_elements {
        drupal_id
        field_accordion_title
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