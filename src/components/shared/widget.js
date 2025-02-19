import React, { lazy, Suspense } from "react";
import { graphql } from "gatsby";
import SectionWidgets from "components/shared/sectionWidgets";
import { renderWidget, slugify } from "utils/ug-utils";
import widgetModules from "components/shared/widgetModules";
import ModalVideoStatic from "components/shared/modalVideoStatic";

// Note - Turned off lazy loading until anchor issue resolved
import MediaText from "components/shared/mediaText";
import StatisticWidget from "components/shared/statisticWidget";
// const MediaText = lazy(() => import("components/shared/mediaText"))
// const StatisticWidget = lazy(() => import("components/shared/statisticWidget"));

const ModalVideo = lazy(() => import("components/shared/modalVideo"));

const WidgetSelector = ({ widget }) => {
  if (widgetModules[widget?.__typename]) {
    let moduleName = widgetModules[widget.__typename].moduleName;
    let fallback = widgetModules[widget.__typename].fallback;
    let shouldLazyLoad = widgetModules[widget.__typename].shouldLazyLoad ?? false;

    // @todo - update the switch-case scenarios so they're handled by renderWidget
    switch (widget?.__typename) {  
      case "paragraph__media_text":
        return (
          // <Suspense key={`suspend-${widget.drupal_id}`} fallback={<></>}>
            <MediaText key={widget.drupal_id} headingClass="mt-md-0" data={widget} />
          // </Suspense>
        );
      case "paragraph__modal_video_widget":
        const video = widget.relationships?.field_media_video;
        return video ? (
          <Suspense key={`suspend-${widget.drupal_id}`} fallback={<ModalVideoStatic modalId={widget.drupal_id} />}>
            <ModalVideo
              key={widget.drupal_id} 
              id={widget.drupal_id}
              src={video?.field_media_oembed_video}
              title={video?.name}
              transcript={video?.relationships?.field_media_file?.publicUrl}
            />
          </Suspense>
        ) : null;
      case "paragraph__section":
        let HeadingLevelSec = widget.field_heading_level ? widget.field_heading_level : "h2";
        if (HeadingLevelSec === "h5" || HeadingLevelSec === "h6") HeadingLevelSec = "h4";
        return (
          <>
            {widget.field_section_title && (
              <HeadingLevelSec id={slugify(widget.field_section_title)}>
                {widget.field_section_title}
              </HeadingLevelSec>
            )}
            <div key={widget.drupal_id} className="row mb-5" data-title="Section widget">
              <SectionWidgets
                data={widget.relationships.field_section_content}
                sectionClasses={widget.field_section_classes}
              />
            </div>
          </>
        );
      case "paragraph__statistic_widget":
        return (
          // <Suspense key={`suspend-${widget.drupal_id}`} fallback={<></>}>
            <StatisticWidget key={widget.drupal_id} statisticData={widget} />
          // </Suspense>
        );
      default:
        return renderWidget(moduleName, shouldLazyLoad, fallback, widget);
    }
  }

  return <></>;
};

const Widget = ({ data }) => {
  return <WidgetSelector widget={data} />
};

export default Widget;

export const query = graphql`
  fragment FieldWidgetsFragment on Node {
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
    ... on paragraph__lead_paragraph {
      ...LeadParagraphFragment
    }
    ... on paragraph__links_widget {
      ...LinksWidgetParagraphFragment
    }
    ... on paragraph__media_text {
      ...MediaTextParagraphFragment
    }
    ... on paragraph__modal_video_widget {
      ...ParagraphModalVideoWidgetFragment
    }
    ... on paragraph__section {
      ...SectionParagraphFragment
    }
    ... on paragraph__section_tabs {
      ...SectionTabsParagraphFragment
    }
    ... on paragraph__statistic_widget {
      ...StatisticWidgetParagraphFragment
    }
    ... on paragraph__stats_widget {
      ...StatsWidgetParagraphFragment
    }
    ... on paragraph__story_widget {
      ...StoryWidgetParagraphFragment
    }
    ... on paragraph__testimonial_slider {
      ...TestimonialSliderParagraphFragment
    }
    ... on paragraph__yaml_widget {
      ...YamlWidgetParagraphFragment
    }
  }
`;