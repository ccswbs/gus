import React, { lazy, Suspense } from "react";
import PropTypes from 'prop-types';
import { graphql } from 'gatsby';
import widgetModules from "components/shared/widgetModules";
// import MediaText from 'components/shared/mediaText';

function renderWidget(componentName, shouldLazyLoad = false, fallback = null, widget, region) {
  let WidgetModule;

  if(shouldLazyLoad === true) {
    const Fallback = fallback ? lazy(() => import(`components/shared/${fallback}`)) : () => <></>;
    WidgetModule = lazy(() => import(`components/shared/${componentName}`));
    return (
      <Suspense key={`suspend-${widget.drupal_id}`} fallback={<Fallback />}>
        <WidgetModule key={widget.drupal_id} data={widget} region={region} />
      </Suspense>
    );
  }

  WidgetModule = require(`components/shared/${componentName}`).default;
  return <WidgetModule key={widget.drupal_id} data={widget} region={region} />
}

const BlockWidget = (props) => {
    
    let basicBlockContent;
    let widgetBlockContent = [];
    
    if (props.data?.relationships?.field_custom_block?.__typename === "block_content__basic") {
        basicBlockContent = props.data?.relationships?.field_custom_block?.body.processed;
    }
    if (props.data?.relationships?.field_custom_block?.__typename === "block_content__widget_block") {
        widgetBlockContent = props.data.relationships.field_custom_block?.relationships?.field_widget_block_content;
        let region = props.region;

        return (widgetBlockContent.map(widget => {
          let moduleName = widgetModules[widget.__typename].moduleName;
          let fallback = widgetModules[widget.__typename].fallback;
          let shouldLazyLoad = widgetModules[widget.__typename].shouldLazyLoad ?? false;

          if (widgetModules[widget.__typename] && widgetModules[widget.__typename].shouldRenderSecondary) {
            switch(widget.__typename) {
              case "paragraph__media_text":
                // return <MediaText key={widget.drupal_id} data={widget} region={region} />;
                return renderWidget(moduleName, shouldLazyLoad, fallback, widget, region);
              default:
                return renderWidget(moduleName, shouldLazyLoad, fallback, widget, region);
            }
          }

          return <></>;
        }))
    }
    return <div dangerouslySetInnerHTML={{__html: basicBlockContent}}></div>
}

BlockWidget.propTypes = {
    data: PropTypes.object,
    region: PropTypes.string,
}

BlockWidget.defaultProps = {
    data: ``,
    region: ``,
}

export default BlockWidget

export const query = graphql`
  fragment BlockWidgetParagraphFragment on paragraph__block_widget {
    drupal_id
    relationships {      
      field_custom_block {
        __typename
        ...on block_content__basic {
          info
          body { 
            processed
          }
        }
        __typename
        ... on block_content__widget_block {
          relationships {
            field_widget_block_content {            
              __typename
              ... on paragraph__accordion_section {
                ...AccordionSectionParagraphFragment
              }
              ... on paragraph__general_text {
                ...GeneralTextParagraphFragment
              }
              ... on paragraph__media_text {
                ...MediaTextParagraphFragment
              }
              ... on paragraph__section_buttons {
                ...SectionButtonsParagraphFragment
              }
              ... on paragraph__section_tabs {
                ...SectionTabsParagraphFragment
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