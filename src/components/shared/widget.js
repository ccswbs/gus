import React from "react";
import { graphql } from "gatsby";
import Accordion from "components/shared/accordion";
import BlockWidget from "components/shared/blockWidget";
import GeneralText from "components/shared/generalText";
import ImageOverlay from "components/shared/imageOverlay";
import LeadPara from "components/shared/leadPara";
import LinksWidget from "./linksWidget";
import MediaText from "components/shared/mediaText";
import PageContainer from "components/shared/pageContainer";
import ModalVideo from "components/shared/modalVideo";
import PageTabs from "components/shared/pageTabs";
import SectionWidgets from "components/shared/sectionWidgets";
import StatisticWidget from "components/shared/statisticWidget";
import StatsWidget from "components/shared/statsWidget";
import Story from "components/shared/story";
import TestimonialSlider from "components/shared/testimonialSlider";
import YamlWidget from "components/shared/yamlWidget";
import { ConditionalWrapper, slugify } from "utils/ug-utils";

const WidgetSelector = ({ widget }) => {
  switch (widget?.__typename) {
    case "paragraph__accordion_section":
      return <Accordion pageData={widget} />;
    case "paragraph__block_widget":
      return <BlockWidget key={widget.drupal_id} blockData={widget} />;
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
        <ModalVideo
          id={widget.drupal_id}
          src={video?.field_media_oembed_video}
          title={video?.name}
          transcript={video?.relationships?.field_media_file?.publicUrl}
        />
      ) : null;
    case "paragraph__section":
      let HeadingLevelSec = widget.field_heading_level ? widget.field_heading_level : "h2";
      if (HeadingLevelSec === "h5" || HeadingLevelSec === "h6") HeadingLevelSec = "h4";
      return (
        <>
          {widget.field_section_title && (
            <HeadingLevelSec id={slugify(widget.field_section_title)} className="mt-0">
              {widget.field_section_title}
            </HeadingLevelSec>
          )}
          <div key={widget.drupal_id} className="row" data-title="Section widget">
            <SectionWidgets
              pageData={widget.relationships.field_section_content}
              sectionClasses={widget.field_section_classes}
            />
          </div>
        </>
      );
    case "paragraph__section_tabs":
      return <PageTabs pageData={widget} />;
    case "paragraph__statistic_widget":
      return <StatisticWidget statisticData={widget} />;
    case "paragraph__stats_widget":
      return <StatsWidget statsWidgetData={widget} />;
    case "paragraph__story_widget":
      return <Story storyData={widget} />;
    case "paragraph__testimonial_slider":
      return <TestimonialSlider testimonialData={widget} />;
    case "paragraph__yaml_widget":
      return <YamlWidget blockData={widget} />;
    default:
      return <></>;
  }
};

const Widget = ({ widget }) => {
  // add any full-width components to the Conditional Wrapper
  return (
    <ConditionalWrapper
      condition={
        widget?.__typename !== "paragraph__yaml_widget" &&
        widget?.__typename !== "paragraph__image_overlay" &&
        widget?.__typename !== "paragraph__modal_video_widget" &&
        widget?.__typename !== "paragraph__story_widget" &&
        widget?.__typename !== "paragraph__statistic_widget" &&
        widget?.__typename !== "paragraph__testimonial_slider"
      }
      wrapper={(children) => (
        <PageContainer.SiteContent>
          <PageContainer.ContentArea>{children}</PageContainer.ContentArea>
        </PageContainer.SiteContent>
      )}
    >
      <WidgetSelector widget={widget} />
    </ConditionalWrapper>
  );
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
