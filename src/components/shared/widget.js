import React from 'react';
import { graphql } from 'gatsby';
import Accordion from 'components/shared/accordion';
import BlockWidget from 'components/shared/blockWidget';
import Events from 'components/shared/events';
import GeneralText from 'components/shared/generalText';
import LeadPara from 'components/shared/leadPara';
import LinksItems from 'components/shared/linksItems';
import MediaText from 'components/shared/mediaText';
import PageTabs from 'components/shared/pageTabs';
import PlaybackButton from 'components/shared/playbackButton';
import SectionWidgets from 'components/shared/sectionWidgets';
import StatsWidget from 'components/shared/statsWidget';

const Widget = ({widget}) => {
    switch (widget?.__typename) {
        case "paragraph__accordion_section":
            return <Accordion pageData={widget} />;
        case "paragraph_block_widget":
            return <BlockWidget processed={widget.field_custom_block.body.processed} />;
        case "paragraph__events_widget":
            return <Events eventData={widget} />;
        case "paragraph__general_text":
            return <GeneralText processed={widget.field_general_text.processed} />;
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
        case "paragraph__playback_button_widget":
          return <PlaybackButton widgetData={widget} />
        case "paragraph__section":
            return (<>
				{widget.field_section_title && <h2>{widget.field_section_title}</h2>}
				<div key={widget.drupal_id} className="row mb-5">
                    <SectionWidgets pageData={widget.relationships.field_section_content} sectionClasses={widget.field_section_classes} />
                </div>
			</>);
        case "paragraph__section_tabs":
            return <PageTabs pageData={widget} />;
        case "paragraph__stats_widget":
            return <StatsWidget statsWidgetData={widget} />;
        default:
            return <></>
    }
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
    ... on paragraph__lead_paragraph {
      ...LeadParagraphFragment
    }
    ... on paragraph__links_widget {
      ...LinksWidgetParagraphFragment
    }
    ... on paragraph__media_text {
      ...MediaTextParagraphFragment
    }
    ... on paragraph__playback_button_widget {
      ...ParagraphPlaybackButtonWidgetFragment
    }
    ... on paragraph__section {
      ...SectionParagraphFragment
    }
    ... on paragraph__section_tabs {
      ...SectionTabsParagraphFragment
    }
    ... on paragraph__stats_widget {
      ...StatsWidgetParagraphFragment
    }
  }
`
