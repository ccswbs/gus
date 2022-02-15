import React from 'react';
import { graphql } from 'gatsby';
import LinksItems from './linksItems';
import CtaPara from './ctaPara';
import LeadPara from './leadPara';
import MediaText from './mediaText';
import SectionWidgets from './sectionWidgets';
import StatsWidget from './statsWidget';
import PageTabs from './pageTabs';
import { contentExists } from '../../utils/ug-utils';

const GeneralText = ({processed}) => (
    <div dangerouslySetInnerHTML={{__html: processed}}></div>
  )

const Widget = ({widget}) => {
    switch (widget?.__typename) {
        case "paragraph__accordion_section":
            return(
                widget.relationships.field_accordion_block_elements.map((accordionData,j) => {
                    return( <>
                        <div className="panel-group panel-group-lists collapse in show" id={"accordionWidget"+widget.drupal_id}>
                            <div className="panel">
                                <div className="panel-heading">
                                    <h4 className="panel-title">
                                        <a data-toggle="collapse" data-parent={"#accordionWidget"+widget.drupal_id} href={"#collapse"+j+widget.drupal_id} className="collapsed" dangerouslySetInnerHTML={{__html: accordionData.field_accordion_block_title.processed}}></a>
                                    </h4>
                                </div>
                                <div id={"collapse"+j+widget.drupal_id} className="panel-collapse collapse in">
                                    <div className="panel-body" dangerouslySetInnerHTML={{__html: accordionData.field_accordion_block_text.processed}}/>
                                </div>
                            </div>
                        </div>
                    </>);
                } )
            );
        case "paragraph__call_to_action":
            return <CtaPara pageData={widget} />;
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
  fragment GeneralTextParagraphFragment on paragraph__general_text {
    drupal_id
    field_general_text {
      processed
    }
    relationships {
      field_section_column {
        name
      }
    }
  }

  fragment AccordionSectionParagraphFragment on paragraph__accordion_section {
    drupal_id
    relationships {
      field_accordion_block_elements {
        drupal_id
        field_accordion_block_title {
          processed
        }
        field_accordion_block_text {
          processed
        }
      }
    }
  }

  fragment FieldWidgetsFragment on Node {
    __typename
    ... on paragraph__call_to_action {
        ...CallToActionParagraphFragment
    }
    ... on paragraph__general_text {
        ...GeneralTextParagraphFragment
    }
    ... on paragraph__accordion_section {
        ...AccordionSectionParagraphFragment
    }
    ... on paragraph__lead_paragraph {
        ...LeadParagraphFragment
    }
    ... on paragraph__section_tabs {
        ...SectionTabsParagraphFragment
    }
    ... on paragraph__links_widget {
        ...LinksWidgetParagraphFragment
    }
    ... on paragraph__section {
        ...SectionParagraphFragment
    }
    ... on paragraph__media_text {
        ...MediaTextParagraphFragment
    }
    ... on paragraph__stats_widget {
        ...StatsWidgetParagraphFragment
    }
  }

`