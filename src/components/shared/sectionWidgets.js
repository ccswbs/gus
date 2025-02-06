import PropTypes from "prop-types";
import React, { lazy, Suspense } from "react";
import classNames from "classnames";
import { graphql } from "gatsby";
import { ConditionalWrapper } from "utils/ug-utils";
import widgetModules from "components/shared/widgetModules";

const StatisticWidget = lazy(() => import("components/shared/statisticWidget"));

// Check if section only contains media and text
function containsMediaTextOnly(widget) {
  return widget?.__typename === "paragraph__media_text";
}

// If only media + text widgets in Primary section
// then automatically create a grid (up to 3 or 4 columns)
function renderMediaGrid(primary_data) {
  let gridClasses = "";

  if(primary_data.length > 1){
    // default is two columns
    let gridDivision = 2;

    // if more than two items, allow for up to 3 or 4 columns
    if (primary_data.length > 2) {
      gridDivision = primary_data.length % 4 === 0 ? "4" : "3";
    }

    gridClasses = `row-cols-1 row-cols-sm-2 row-cols-lg-${gridDivision}`;
  }

  return gridClasses;
}

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

// For the left column
function renderPrimary(widget) {
  let moduleName = widgetModules[widget.__typename].moduleName;
  let fallback = widgetModules[widget.__typename].fallback;
  let shouldLazyLoad = widgetModules[widget.__typename].shouldLazyLoad ?? false;
  let region = "Primary";

  if (widgetModules[widget.__typename] && widgetModules[widget.__typename].shouldRenderPrimary) {
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

const SectionWidgets = React.memo(function SectionWidgets(props) {
  
  if (props.data?.length > 0) {
    let primary = [];
    let secondary = [];
    let primaryClass;
    let secondaryClass;
    let allWidgets = props.data;
    let sectionClasses = props.sectionClasses;
    let onlyContainsMediaText = true;

    // sort all widgets into primary or secondary regions
    allWidgets.forEach((widgetData) => {
      let sectionColumn = widgetData.relationships?.field_section_column?.name;

      if (sectionColumn === "right" || sectionColumn === "Secondary") {
        secondary.push(widgetData);
      } else {
        primary.push(widgetData);

        // check if primary column only contains media text widgets
        if(!containsMediaTextOnly(widgetData)){
          onlyContainsMediaText = false;
        }
      }
    });

    // if only media text widgets, render a media grid
    let gridClasses = onlyContainsMediaText === true ? renderMediaGrid(primary) : "";

    // if secondary region exists
    if (secondary.length > 0) {
      if (sectionClasses === "col-md-6") {
        primaryClass = classNames("col-md-6 mb-5 mb-md-0");
        secondaryClass = classNames("col-md-6");
      } else {
        primaryClass = classNames("col-md-9 mb-5 mb-md-0");
        secondaryClass = classNames("col-md-3");
      }
    } else {
      // only primary region exists
      primaryClass = classNames("row", gridClasses);
    }

    return (
      <>
        <div className={primaryClass} data-title="Primary column">
          <ConditionalWrapper
            condition={secondary.length > 0}
            wrapper={(children) => <div className={classNames("row", gridClasses)}>{children}</div>}
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
