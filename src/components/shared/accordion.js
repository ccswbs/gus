import React from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'gatsby';
import TaggedContent from 'components/shared/taggedContent';

const Accordion = (props) => {
    let accordionData = props.pageData?.relationships?.field_accordion_block_elements;
    let stayOpen = props.pageData?.field_accordion_stay_open;
    let dataParent = ("#accordion" + props.pageData?.drupal_id);

    if (accordionData) {
        return <>
            <div className="accordion" id={"accordion" + props.pageData.drupal_id}>
            {accordionData.map(item =>
                <div className="accordion-item" key={"item" + item.drupal_id}>
                    <h2 className="accordion-header" id={"heading" + item.drupal_id}>
                        <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target={"#part" + item.drupal_id} aria-expanded="false" aria-controls={"part" + item.drupal_id}>
                            {item?.field_accordion_title ? item.field_accordion_title : "Read More"}
                        </button>
                    </h2>
                    <div {...(stayOpen ? {} : {"data-bs-parent":dataParent})} id={"part" + item.drupal_id} className="accordion-collapse collapse" aria-labelledby={"heading" + item.drupal_id}>            
                        <div className="accordion-body">
                            <div dangerouslySetInnerHTML={{__html: item.field_accordion_block_text.processed}} />
                            <TaggedContent contentType={item.relationships?.field_tagged_content?.field_content_type} tags={item.relationships?.field_tagged_content?.relationships?.field_tags} />
                        </div>
                    </div>
                </div>
            )}
            </div>
        </>
    }
    return null;
}

Accordion.propTypes = {
    pageData: PropTypes.object,
}
  
Accordion.defaultProps = {
    pageData: ``,
}

export default Accordion

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
        relationships {
          field_tagged_content {
            field_content_type
            relationships {
              field_tags {
                __typename
                ... on TaxonomyInterface {
                  name
                }
              }
            }
          }
        }
      }
      field_section_column {
        name
      }
    }
  }
`