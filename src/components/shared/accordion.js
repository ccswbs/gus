import React, { lazy, Suspense } from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'gatsby';
import { slugify, ParseText } from 'utils/ug-utils';

const AccordionBody = lazy(() => import('./accordionBody'));

const Accordion = (props) => {
    let accordionData = props.data?.relationships?.field_accordion_block_elements;
    let accordionTitle = props.data?.field_accordion_title;
    let accordionDescription = props.data?.field_accordion_description?.processed;
    let stayOpen = props.data?.field_accordion_stay_open;
    let dataParent = ("#accordion" + props.data?.drupal_id);
    let HeadingLevel = (props.data?.field_heading_level ? props.data.field_heading_level : "h2");

    if (accordionData) {
      return (<>
          {accordionTitle && <HeadingLevel id={slugify(accordionTitle)}>{accordionTitle}</HeadingLevel>}
          {accordionDescription && <ParseText textContent={accordionDescription} />}
          <div className="accordion mb-5" id={"accordion" + props.data.drupal_id}>
            {accordionData.map((item) => {
              const accordionToggle = (
                <button
                  className="accordion-button collapsed"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target={"#part" + item.drupal_id}
                  aria-expanded="false"
                  aria-controls={"part" + item.drupal_id}
                >
                  {item?.field_accordion_title ? item.field_accordion_title : "Read More"}
                </button>
              );

              let ItemHeading = (item?.field_heading_level ? item.field_heading_level : "h2");
              
              return (
                <div className="accordion-item" key={"item" + item.drupal_id}>
                  <ItemHeading className="accordion-header" id={"heading" + item.drupal_id}>{accordionToggle}</ItemHeading>
                  <div {...(stayOpen ? {} : {"data-bs-parent": dataParent})} id={"part" + item.drupal_id} className="accordion-collapse collapse" aria-labelledby={"heading" + item.drupal_id}>
                    <Suspense fallback={<div>Loading content...</div>}>
                      <AccordionBody content={item.field_accordion_block_text.processed} />
                    </Suspense>
                  </div>
                </div>
              );
            })}
          </div>
        </>);
    }
    return null;
}

Accordion.propTypes = {
    data: PropTypes.object,
}
  
Accordion.defaultProps = {
    data: ``,
}

export default Accordion

export const query = graphql`
  fragment AccordionSectionParagraphFragment on paragraph__accordion_section {
    drupal_id
    field_accordion_description {
      processed
    }
    field_accordion_stay_open
    field_accordion_title
    field_heading_level
    relationships {
      field_accordion_block_elements {
        drupal_id
        field_accordion_title
        field_heading_level
        field_accordion_block_text {
          processed
        }        
      }
      field_section_column {
        name
      }
    }
  }
`