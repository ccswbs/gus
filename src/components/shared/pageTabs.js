import React, { useState, useEffect, useRef } from "react"
import PropTypes from "prop-types"
import { graphql } from "gatsby"
import Tab from "react-bootstrap/Tab"
import Tabs from "react-bootstrap/Tabs"
import Fade from "react-bootstrap/Fade"
import "styles/pageTabs.css"
import { slugify, ParseText } from "../../utils/ug-utils"

const PageTabs = (props) => {
  const container = useRef(null)
  const tabs = props.pageData?.relationships?.field_tabs;
  const [activeTab, setActiveTab] = useState(tabs?.[0]?.drupal_id ?? "")

  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const titleOrID = params.get("tab")

    if (titleOrID) {
      // Try to find a tab with a matching drupal id
      let found = tabs?.find((tab) => tab.drupal_id === titleOrID)

      // If we couldn't find a matching id, then try and find a matching title
      found ??= tabs?.find((tab) => titleOrID === slugify(tab.field_tab_title.toLowerCase()))

      // Set the active tab to which ever was found
      // If neither could be found then set the active tab to the first tab.
      setActiveTab(found?.drupal_id ?? tabs?.[0]?.drupal_id)

      found && container.current?.scrollIntoView({ block: "start", inline: "nearest" })
    }
  }, [tabs])

  if (tabs?.length <= 0) {
    return null
  }

  return (
    <div className="col-md-12 content-area nav-tabs-container" ref={container}>
      <Tabs activeKey={activeTab} onSelect={(k) => setActiveTab(k)} justify transition={Fade}>
        {tabs?.map((tab) => (
          <Tab key={tab.drupal_id} eventKey={tab.drupal_id} title={tab.field_tab_title.toUpperCase()}>
            <div data-tab-id={tab.drupal_id}>
              <ParseText textContent={tab.field_tab_body.processed} />
            </div>
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
