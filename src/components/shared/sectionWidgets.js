import PropTypes from "prop-types";
import React, { lazy, Suspense } from "react";
import classNames from "classnames";
import { graphql } from "gatsby";
import { ConditionalWrapper, renderWidget } from "utils/ug-utils";
import widgetModules from "components/shared/widgetModules";

const StatisticWidget = lazy(() => import("components/shared/statisticWidget"));

const templates = {
  'primary-100': { primary: '', secondary: '' },
  'primary-50-secondary-50': { primary: 'col-md-6 mb-5 mb-md-0', secondary: 'col-md-6'},
  'primary-75-secondary-25': { primary: 'col-md-9 mb-5 mb-md-0', secondary: 'col-md-3'},
}

// Check if section only contains media and text
function containsMediaTextOnly(widget) {
  return widget?.__typename === "paragraph__media_text";
}

// Create a grid if only media + text widgets in Primary section
// default is two columns; if more, then 3 or 4 columns
function renderMediaGrid(primary_data) {
  let mediaGridClasses = "";

  if(primary_data.length > 1){
    let gridDivision = 2;

    if (primary_data.length > 2) {
      gridDivision = primary_data.length % 4 === 0 ? "4" : "3";
    }

    mediaGridClasses = `row row-cols-1 row-cols-sm-2 row-cols-lg-${gridDivision}`;
  }

  return mediaGridClasses;
}

// For the left column
function renderPrimary(widget) {
<<<<<<< HEAD
  switch (widget?.__typename) {
    case "paragraph__accordion_section":
      return (
        <Suspense fallback={<></>}>
          <Accordion key={widget.drupal_id} pageData={widget} />
        </Suspense>
        );
    case "paragraph__block_widget":
      return (
        <Suspense fallback={<></>}>
          <BlockWidget key={widget.drupal_id} blockData={widget} region="Primary" />
        </Suspense>
      );
    case "paragraph__general_text":
      return <GeneralText key={widget.drupal_id} processed={widget.field_general_text.processed} />;
    case "paragraph__image_overlay":
      return <ImageOverlay key={widget.drupal_id} data={widget} />;
    case "paragraph__lead_paragraph":
      return <LeadPara key={widget.drupal_id} pageData={widget} />;
    case "paragraph__links_widget":
      return <LinksWidget key={widget.drupal_id} data={widget} />;
    case "paragraph__media_text":
      return <MediaText key={widget.drupal_id} widgetData={widget} region="Primary" />;
    case "paragraph__section_tabs":
      return (
        <Suspense fallback={<></>}>
          <PageTabs key={widget.drupal_id} pageData={widget} />
        </Suspense>
      );
    case "paragraph__statistic_widget":
      return (
        <Suspense fallback={<></>}>
          <StatisticWidget key={widget.drupal_id} statisticData={widget} shouldHaveContainer={false} />
        </Suspense>
      );
    case "paragraph__stats_widget":
      return(
        <Suspense fallback={<></>}>
          <StatsWidget key={widget.drupal_id} statsWidgetData={widget} />
        </Suspense>
      );
    case "paragraph__section_buttons":
      return <SectionButtons key={widget.drupal_id} pageData={widget} />;
    case "paragraph__yaml_widget":
      return (
        <Suspense fallback={<></>}>
          <YamlWidget key={widget.drupal_id} blockData={widget} />
        </Suspense>
      );
    default:
      return <></>;
=======
  let moduleName = widgetModules[widget.__typename].moduleName;
  let fallback = widgetModules[widget.__typename].fallback;
  let shouldLazyLoad = widgetModules[widget.__typename].shouldLazyLoad ?? false;
  let region = "Primary";

  if (widgetModules[widget.__typename] && widgetModules[widget.__typename].shouldRenderPrimary) {

    // @todo - update the switch-case scenarios so they're handled by renderWidget
    switch (widget?.__typename) {
      case "paragraph__statistic_widget":
        return (
          <Suspense key={`suspend-${widget.drupal_id}`} fallback={<></>}>
            <StatisticWidget key={widget.drupal_id} statisticData={widget} shouldHaveContainer={false} />
          </Suspense>
        );
      default:
        return renderWidget(moduleName, shouldLazyLoad, fallback, widget, region);
    }
>>>>>>> prog-block2
  }

  return <></>;
}

// For the right column
function renderSecondary(widget, sectionClasses) {
  let moduleName = widgetModules[widget.__typename].moduleName;
  let fallback = widgetModules[widget.__typename].fallback;
  let shouldLazyLoad = widgetModules[widget.__typename].shouldLazyLoad ?? false;
  let region = "Secondary";

  if (widgetModules[widget.__typename] && widgetModules[widget.__typename].shouldRenderSecondary) {

    // Only render certain widgets if there's enough space, i.e. class of col-md-6
    if(widget.__typename === "paragraph__accordion_section" || widget.__typename === "paragraph__section_tabs") {
        if (sectionClasses === "col-md-6"){
          return renderWidget(moduleName, shouldLazyLoad, fallback, widget, region);
        }else {
          return <></>;
        }
    }
    return renderWidget(moduleName, shouldLazyLoad, fallback, widget, region);
  }
  
  return <></>;
}

function sortWidgets(widgets){
  const primary = [];
  const secondary = [];
  let onlyContainsMediaText = true;

  // sort all widgets into primary or secondary regions
  widgets.forEach((widgetData) => {
    let sectionColumn = widgetData.relationships?.field_section_column?.name;

    if (sectionColumn === "right" || sectionColumn === "Secondary") {
      secondary.push(widgetData);
    } else {
      primary.push(widgetData);

      // check if primary only contains media text widgets
      if(!containsMediaTextOnly(widgetData)){
        onlyContainsMediaText = false;
      }
    }
  });

  return({primary, secondary, onlyContainsMediaText});
}

function getTemplate(secondaryRegionExists, sectionClasses){
  if (secondaryRegionExists) {
    if (sectionClasses === "col-md-6") {
      return "primary-50-secondary-50";
    } else {
      return "primary-75-secondary-25";
    }
  }
  return "primary-100";
}

const SectionWidgets = React.memo(function SectionWidgets(props) {
  
  if (props.data?.length > 0) {
    let allWidgets = props.data;
    const sortedWidgets = sortWidgets(allWidgets);

    let primary = sortedWidgets?.primary;
    let secondary = sortedWidgets?.secondary;

    // if only media text widgets, render a media grid
    let onlyContainsMediaText = sortedWidgets?.onlyContainsMediaText;
    let mediaGridClasses = onlyContainsMediaText === true ? renderMediaGrid(primary) : "";

    let sectionClasses = props.sectionClasses;
    const secondaryRegionExists = (secondary.length > 0) ? true : false;
    let template = getTemplate(secondaryRegionExists, sectionClasses);

    let primaryClass = (template === "primary-100") ? classNames(templates[template].primary, mediaGridClasses) : classNames(templates[template].primary);
    let secondaryClass = classNames(templates[template].secondary);

    return (
      <>
        <div className={primaryClass} data-title="Primary column">
          <ConditionalWrapper
            condition={secondary.length > 0}
            wrapper={(children) => <div className={classNames("row", mediaGridClasses)}>{children}</div>}
          >
            {primary &&
              primary.map((widget) => {
                return renderPrimary(widget);
              })}
          </ConditionalWrapper>
        </div>
        {secondary.length > 0 && (
          <div className={secondaryClass} data-title="Secondary column">
            {secondary.map((widget) => {
              return renderSecondary(widget, sectionClasses);
            })}
          </div>
        )}
      </>
    );
  }
  return null;
});

/**
 * SectionWidgets component
 * 
 * @param {Array} data - Array of widgets data to be rendered.
 * @param {string} sectionClasses - CSS classes for the section.
 */
SectionWidgets.propTypes = {
  data: PropTypes.array,
  sectionClasses: PropTypes.string,
};
SectionWidgets.defaultProps = {
  data: [],
  sectionClasses: null,
};

export default React.memo(SectionWidgets);

export const query = graphql`
  fragment SectionParagraphFragment on paragraph__section {
    drupal_id
    field_section_title
    field_heading_level
    field_section_classes
    relationships {
      field_section_content {
        __typename
        ... on paragraph__accordion_section {
          ...AccordionSectionParagraphFragment
        }
        ... on paragraph__block_widget {
          ...BlockWidgetParagraphFragment
        }
        ... on paragraph__general_text {
          ...GeneralTextParagraphFragment
        }
        ... on paragraph__image_overlay {
          ...ImageOverlayParagraphFragment
        }
        ... on paragraph__links_widget {
          ...LinksWidgetParagraphFragment
        }
        ... on paragraph__media_text {
          ...MediaTextParagraphFragment
        }
        ... on paragraph__statistic_widget {
          ...StatisticWidgetParagraphFragment
        }
        ... on paragraph__stats_widget {
          ...StatsWidgetParagraphFragment
        }
        ... on paragraph__lead_paragraph {
          ...LeadParagraphFragment
        }
        ... on paragraph__section_buttons {
          ...SectionButtonsParagraphFragment
        }
        ... on paragraph__section_tabs {
          ...SectionTabsParagraphFragment
        }
        ... on paragraph__yaml_widget {
          ...YamlWidgetParagraphFragment
        }
      }
    }
  }
`;
