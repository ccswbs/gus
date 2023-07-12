import React from 'react';
import { graphql } from 'gatsby';
import { Container, Row } from 'react-bootstrap';
import { ConditionalWrapper, slugify } from 'utils/ug-utils';

const Accordion = React.lazy(() => import('components/shared/accordion'));
const BlockWidget = React.lazy(() => import('components/shared/blockWidget'));
const Events = React.lazy(() => import('components/shared/events'));
const GeneralText = React.lazy(() => import('components/shared/generalText'));
const ImageOverlay = React.lazy(() => import('components/shared/imageOverlay'));
const LeadPara = React.lazy(() => import('components/shared/leadPara'));
const LinksItems = React.lazy(() => import('components/shared/linksItems'));
const MediaText = React.lazy(() => import('components/shared/mediaText'));
const ModalVideo = React.lazy(() => import('components/shared/modalVideo'));
const PageTabs = React.lazy(() => import('components/shared/pageTabs'));
const SectionWidgets = React.lazy(() => import('components/shared/sectionWidgets'));
const StatisticWidget = React.lazy(() => import('components/shared/statisticWidget'));
const StatsWidget = React.lazy(() => import('components/shared/statsWidget'));
const Story = React.lazy(() => import('components/shared/story'));
const TestimonialSlider = React.lazy(() => import('components/shared/testimonialSlider'));
const YamlWidget = React.lazy(() => import('components/shared/yamlWidget'));

const WidgetSelector = ({widget}) => {
    switch (widget?.__typename) {
        case "paragraph__accordion_section":
            return <Accordion pageData={widget} />;
        case "paragraph__block_widget":
            return <BlockWidget blockData={widget} />;
        case "paragraph__events_widget":
            return <Events eventData={widget} />;
        case "paragraph__general_text":
            return <GeneralText processed={widget.field_general_text.processed} />;
        case "paragraph__image_overlay":
            return <ImageOverlay data={widget} />;
        case "paragraph__lead_paragraph":
            return( <LeadPara pageData={widget} />);
        case "paragraph__links_widget":
            const gridFirstHeadingLevel = "h2";
            const listFirstHeadingLevel = "h2";
            const linksDisplayType = widget.relationships.field_link_items[0].relationships.field_link_image ? "grid" : "list";
            const headingLevel = (linksDisplayType === "grid") ? gridFirstHeadingLevel : listFirstHeadingLevel;
            const numColumns = (linksDisplayType === "grid") ? 4 : null;
            return <LinksItems key={widget.drupal_id}
                        pageData={widget.relationships.field_link_items}
                        displayType={linksDisplayType}
                        heading={widget.field_link_items_title}
                        headingLevel={headingLevel}
                        description={widget.field_link_items_description}
                        numColumns={numColumns} />
        case "paragraph__media_text":
          return <MediaText headingClass="mt-md-0" widgetData={widget} />;
        case "paragraph__modal_video_widget":
          const video = widget.relationships?.field_media_video;
          return video ? <ModalVideo 
            id={widget.drupal_id}
            src={video?.field_media_oembed_video}
            title={video?.name}
            transcript={video?.relationships?.field_media_file?.publicUrl} /> 
            : null;
        case "paragraph__section":
            return (<>
              {widget.field_section_title && <h2 id={slugify(widget.field_section_title)} className="mt-0">{widget.field_section_title}</h2>}
                <div key={widget.drupal_id} className="row" data-title="Section widget">
                    <SectionWidgets pageData={widget.relationships.field_section_content} sectionClasses={widget.field_section_classes} />
                </div>
            </>);
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
            return <></>
    }
}

const Widget = ({widget}) => {
    // add any full-width components to the Conditional Wrapper
    return <ConditionalWrapper 
        condition={widget?.__typename !== "paragraph__yaml_widget" 
            && widget?.__typename !== "paragraph__image_overlay"
            && widget?.__typename !== "paragraph__modal_video_widget" 
            && widget?.__typename !== "paragraph__story_widget"
            && widget?.__typename !== "paragraph__statistic_widget" 
            && widget?.__typename !== "paragraph__testimonial_slider" } 
        wrapper={children => 
            <Container className="page-container">
              <Row className="site-content">
                <div className="content-area">
                  {children}
                </div>
              </Row>
            </Container>
        }>
        <WidgetSelector widget={widget} />
    </ConditionalWrapper>
}

export default Widget

export const query = graphql`
  fragment FieldWidgetsFragment on Node {
    __typename
    ... on paragraph__accordion_section {
      ...AccordionSectionParagraphFragment
    }
    ... on paragraph__block_widget {
      ...BlockWidgetParagraphFragment
    }
    ... on paragraph__events_widget {
      ...EventsParagraphFragment
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
`
