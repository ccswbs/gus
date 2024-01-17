import React, { useState, useEffect, useRef } from "react"
import PropTypes from "prop-types"
import { graphql } from "gatsby"
import Tab from "react-bootstrap/Tab"
import Tabs from "react-bootstrap/Tabs"
import Fade from "react-bootstrap/Fade"
import "styles/pageTabs.css"
import { slugify } from "../../utils/ug-utils"

const PageTabs = (props) => {
  const container = useRef(null)
  const tabs = props.pageData?.relationships?.field_tabs ?? []
  const [activeTab, setActiveTab] = useState("")

  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const title = params.get("tab")
    let tabID = tabs[0]?.drupal_id

    if (title) {
      for (const tab of tabs) {
        if (title === slugify(tab.field_tab_title.toLowerCase())) {
          tabID = tab.drupal_id
          container.current?.scrollIntoView({ block: "start", inline: "nearest" })
          break
        }
      }
    }

    setActiveTab(tabID)
  }, [])

  if (tabs.length <= 0) {
    return null
  }

  return (
    <div className="col-md-12 content-area nav-tabs-container" ref={container}>
      <Tabs activeKey={activeTab} onSelect={(k) => setActiveTab(k)} justify transition={Fade}>
        {tabs.map((tab) => (
          <Tab key={tab.drupal_id} eventKey={tab.drupal_id} title={tab.field_tab_title.toUpperCase()}>
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
