import React from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'gatsby';
import { contentExists } from 'utils/ug-utils.js';
import NavTabs from 'components/shared/navTabs';
import NavTabHeading from 'components/shared/navTabHeading';
import NavTabContent from 'components/shared/navTabContent';

function renderTabInfo (pageData) {
    
    let activeValue = true;
    let navTabHeadings = [];
    let navTabContent = [];    

    if (contentExists(pageData)) {

        let tabID = "";

        for (let i = 0; i < pageData.relationships.field_tabs.length; i++) {
            tabID = "pills-" + pageData.relationships.field_tabs[i].drupal_id;

            if (i > 0) activeValue = false;

            navTabHeadings.push(<NavTabHeading key={`navTabHeading-` + i}
                active={activeValue}
                heading={pageData.relationships.field_tabs[i].field_tab_title}
                controls={tabID}
            />);

            navTabContent.push(<NavTabContent key={`navTabContent-` + i}
                active={activeValue}
                id={tabID}
                content={<div dangerouslySetInnerHTML={{ __html: pageData.relationships.field_tabs[i].field_tab_body.processed }} />}
            />);
        }
        return (
        <React.Fragment>
            <NavTabs headings={
                navTabHeadings.map((heading) => {
                    return heading;
                    })
                }>
                {navTabContent.map((content) => {
                    return content;

                })}
            </NavTabs>
        </React.Fragment>
        )
    }
    return null;
}

function pageTabs (props) {

    if (contentExists(props.pageData) && props.pageData.length !== 0) {        
        return (
            <div className="col-md-12 content-area">
                {renderTabInfo(props.pageData)}
           </div>
        )
    } else {
        return null;
    }
}

pageTabs.propTypes = {
    pageData: PropTypes.object,
}

pageTabs.defaultProps = {
    pageData: ``,
}

export default pageTabs

export const query = graphql`
    fragment SectionTabsParagraphFragment on paragraph__section_tabs {
        drupal_id
        relationships {
          field_tabs {
            drupal_id
            field_tab_title
            field_tab_body {
              processed
            }
          }
          field_section_column {
            name
          }
        }
    }
`
