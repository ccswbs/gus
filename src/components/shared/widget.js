import React from "react";
import { graphql } from "gatsby";
import Accordion from "components/shared/accordion";
import BlockWidget from "components/shared/blockWidget";
import GeneralText from "components/shared/generalText";
import ImageOverlay from "components/shared/imageOverlay";
import LeadPara from "components/shared/leadPara";
import Links from "components/shared/links";
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

const widgetMap = {
  paragraph__accordion_section: ({ widget }) => <Accordion pageData={widget} />,
  paragraph__block_widget: ({ widget }) => <BlockWidget blockData={widget} />,
  paragraph__general_text: ({ widget }) => <GeneralText processed={widget.field_general_text.processed} />,
  paragraph__image_overlay: ({ widget }) => <ImageOverlay data={widget} />,
  paragraph__lead_paragraph: ({ widget }) => <LeadPara pageData={widget} />,
  paragraph__links_widget: ({ widget }) => {
    const gridFirstHeadingLevel = "h2";
    const listFirstHeadingLevel = "h2";
    const type = widget.relationships?.field_link_items?.[0]?.relationships?.field_link_image ? "grid" : "list";
    const headingLevel = type === "grid" ? gridFirstHeadingLevel : listFirstHeadingLevel;
    const numColumns = type === "grid" ? 4 : null;
    return (
      <Links
        key={widget.drupal_id}
        items={widget.relationships.field_link_items}
        type={type}
        title={widget.field_link_items_title}
        description={widget.field_link_items_description}
        level="h2"
        columns={4}
      />
    );
  },
  paragraph__media_text: ({ widget }) => <MediaText headingClass="mt-md-0" widgetData={widget} />,
  paragraph__modal_video_widget: ({ widget }) => {
    const video = widget.relationships?.field_media_video;
    return video ? (
      <ModalVideo
        id={widget.drupal_id}
        src={video?.field_media_oembed_video}
        title={video?.name}
        transcript={video?.relationships?.field_media_file?.publicUrl}
      />
    ) : null;
  },
  paragraph__section: ({ widget }) => {
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
  },
  paragraph__section_tabs: ({ widget }) => <PageTabs pageData={widget} />,
  paragraph__statistic_widget: ({ widget }) => <StatisticWidget statisticData={widget} />,
  paragraph__stats_widget: ({ widget }) => <StatsWidget statsWidgetData={widget} />,
  paragraph__story_widget: ({ widget }) => <Story storyData={widget} />,
  paragraph__testimonial_slider: ({ widget }) => <TestimonialSlider testimonialData={widget} />,
  paragraph__yaml_widget: ({ widget }) => <YamlWidget blockData={widget} />,
};

const Widget = ({ widget }) => {
  const WidgetComponent = widgetMap[widget?.__typename];

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
      <WidgetComponent widget={widget} />
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
