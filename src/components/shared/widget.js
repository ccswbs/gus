import React, { lazy, Suspense } from "react";
import { graphql } from "gatsby";
import GeneralText from "components/shared/generalText";
import ImageOverlay from "components/shared/imageOverlay";
import LeadPara from "components/shared/leadPara";
import LinksWidget from "./linksWidget";
import MediaText from "components/shared/mediaText";
import ModalVideoStatic from "./modalVideoStatic";
import SectionWidgets from "components/shared/sectionWidgets";
import { slugify } from "utils/ug-utils";

const Accordion = lazy(() => import("components/shared/accordion"));
const BlockWidget = lazy(() => import("components/shared/blockWidget"));
const ModalVideo = lazy(() => import("components/shared/modalVideo"));
const PageTabs = lazy(() => import("components/shared/pageTabs"));
const TestimonialSlider = lazy(() => import("components/shared/testimonialSlider"));
const Story = lazy(() => import("components/shared/story"));
const StatsWidget = lazy(() => import("components/shared/statsWidget"));
const StatisticWidget = lazy(() => import("components/shared/statisticWidget"));
const YamlWidget = lazy(() => import("components/shared/yamlWidget"));

const WidgetSelector = ({ widget }) => {
  switch (widget?.__typename) {
    case "paragraph__accordion_section":
      return (
        <Suspense fallback={<></>}>
          <Accordion pageData={widget} />
        </Suspense>
      );
    case "paragraph__block_widget":
      return (
        <Suspense fallback={<></>}>
          <BlockWidget key={widget.drupal_id} blockData={widget} />
        </Suspense>
      );
    case "paragraph__general_text":
      return <GeneralText processed={widget.field_general_text.processed} />;
    case "paragraph__image_overlay":
      return <ImageOverlay data={widget} />;
    case "paragraph__lead_paragraph":
      return <LeadPara pageData={widget} />;
    case "paragraph__links_widget":
      return <LinksWidget key={widget.drupal_id} data={widget} />;
    case "paragraph__media_text":
      return <MediaText headingClass="mt-md-0" widgetData={widget} />;
    case "paragraph__modal_video_widget":
      const video = widget.relationships?.field_media_video;
      return video ? (
        <Suspense fallback={<ModalVideoStatic modalId={widget.drupal_id} />}>
          <ModalVideo
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
              pageData={widget.relationships.field_section_content}
              sectionClasses={widget.field_section_classes}
            />
          </div>
        </>
      );
    case "paragraph__section_tabs":
      return (
        <Suspense fallback={<></>}>
          <PageTabs pageData={widget} />
        </Suspense>
      );
      case "paragraph__statistic_widget":
        return (
          <Suspense fallback={<></>}>
            <StatisticWidget statisticData={widget} />
          </Suspense>
        );
      case "paragraph__stats_widget":
        return (
          <Suspense fallback={<></>}>
            <StatsWidget statsWidgetData={widget} />
          </Suspense>
        );
      case "paragraph__story_widget":
        return (
          <Suspense fallback={<></>}>
            <Story storyData={widget} />
          </Suspense>
        );
    case "paragraph__testimonial_slider":
      return (
        <Suspense fallback={<></>}>
          <TestimonialSlider testimonialData={widget} />
        </Suspense>
      );
    case "paragraph__yaml_widget":
      return (
        <Suspense fallback={<></>}>
          <YamlWidget blockData={widget} />
        </Suspense>
      );
    default:
      return <></>;
  }
};

const Widget = ({ widget }) => {
  return <WidgetSelector widget={widget} />
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