import React from 'react';
import { graphql } from 'gatsby';
import AccordionWidget from 'components/shared/accordionWidget';
import CtaPara from 'components/shared/ctaPara';
import Events from 'components/shared/events';
import GeneralText from 'components/shared/generalText';
import LeadPara from 'components/shared/leadPara';
import LinksItems from 'components/shared/linksItems';
import MediaText from 'components/shared/mediaText';
import PageTabs from 'components/shared/pageTabs';
import SectionWidgets from 'components/shared/sectionWidgets';
import StatsWidget from 'components/shared/statsWidget';
import { contentExists } from 'utils/ug-utils';

const Widget = ({widget}) => {
    switch (widget?.__typename) {
        case "paragraph__accordion_section":
            return <AccordionWidget pageData={widget} />;
        case "paragraph__call_to_action":
            return <CtaPara pageData={widget} />;
        case "paragraph__events_widget":
            return <Events eventData={widget} />;
        case "paragraph__general_text":
            return <GeneralText processed={widget.field_general_text.processed} />;
        case "paragraph__lead_paragraph":
            return( <LeadPara pageData={widget} />);
        case "paragraph__links_widget":
            const gridFirstHeadingLevel = "h2";
            const listFirstHeadingLevel = "h2";
            const linksDisplayType = (contentExists(widget.relationships.field_link_items[0].relationships.field_link_image))? 'grid': 'list';
            const headingLevel = (linksDisplayType === 'grid')? gridFirstHeadingLevel: listFirstHeadingLevel;
            const numColumns = (linksDisplayType === 'grid')? 4: null;
            return <LinksItems  key={widget.drupal_id}
                        pageData={widget.relationships.field_link_items} 
                        displayType={linksDisplayType} 
                        heading={widget.field_link_items_title} 
                        headingLevel={headingLevel} 
                        description={widget.field_link_items_description}
                        numColumns={numColumns}/>

        case "paragraph__media_text":
            return <div className="row mt-5"><MediaText headingClass="mt-md-0" widgetData={widget} /></div>;
        case "paragraph__section":
            return (<>
				{contentExists(widget.field_section_title) === true && <h2>{widget.field_section_title}</h2>}
				<div key={widget.drupal_id} className={widget.field_section_classes}>                    
                    <SectionWidgets pageData={widget.relationships.field_section_content}/>
                </div>
			</>);
        case "paragraph__section_tabs":
            return( <PageTabs pageData={widget} />);
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
    ... on paragraph__call_to_action {
        ...CallToActionParagraphFragment
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