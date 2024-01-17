import React, { useState, useEffect } from "react"
import PropTypes from "prop-types"
import { graphql } from "gatsby"
import Tab from "react-bootstrap/Tab"
import Tabs from "react-bootstrap/Tabs"
import 'styles/pageTabs.css';

const PageTabs = (props) => {
  const tabs = props.pageData?.relationships?.field_tabs ?? []
  const [activeTab, setActiveTab] = useState("")

  useEffect(() => {
    let initialTab = tabs[0]?.drupal_id;
    setActiveTab(initialTab)
  }, [])
  
  if (tabs.length <= 0) {
    return null
  }

  return (
    <div className="col-md-12 content-area">
      <Tabs activeKey={activeTab} onSelect={(k) => setActiveTab(k)} justify>
        {tabs.map((tab) => (
          <Tab key={tab.drupal_id} eventKey={tab.drupal_id} title={tab.field_tab_title}>
            <div dangerouslySetInnerHTML={{ __html: tab.field_tab_body.processed }} />
          </Tab>
        ))}
      </Tabs>
    </div>
  )
}

PageTabs.propTypes = {
  pageData: PropTypes.object,
}

PageTabs.defaultProps = {
  pageData: ``,
}

export default PageTabs

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
