import React from "react"
import { useState, useEffect } from "react"
import Seo from "../components/seo"
import Layout from 'components/layout';

const NotFoundPage = () => {
  const [archiveLink, setArchiveLink] = useState("https://web.archive.org/web/*/https://www.uoguelph.ca")

  useEffect(() => {
    setArchiveLink("https://web.archive.org/web/*/https://www.uoguelph.ca" + window.location.pathname)
  }, [])

  return (

    <Layout>
      <div className="container page-container">
        <div className="site-content">
          <div className="content-area">
            <h1>HTTP 404 — File not found</h1>
            <p>
              The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
            </p>
            <p>We think you will find one of the following links useful:</p>
            <p>
              <a href="https://www.uoguelph.ca/">University of Guelph Home Page</a>
            </p>
            <p>
              <a href="https://www.uoguelph.ca/sitemap">University of Guelph Site Map</a>
            </p>
            <p>
              <strong>You may not be able to find this page because of:</strong>
            </p>
            <ol type="a">
              <li>
                An <strong>out-of-date bookmark/favourite</strong>
              </li>
              <li>
                A search engine that has an <strong>out-of-date listing for us</strong>
              </li>
              <li>
                A <strong>mis-typed address</strong>
              </li>
              <li>
                If you are <strong>looking for an out-of-date page</strong> that might have been removed from this site, you
                can search for <a href={archiveLink}>an archival copy</a> at the{" "}
                <a href="https://www.archive.org">Internet Archive</a>. The University of Guelph is not responsible for the
                contents of the Internet Archive.
              </li>
            </ol>
            <p>
              Please visit the University of Guelph homepage at <a href="https://www.uoguelph.ca/">www.uoguelph.ca</a> or
              contact the website manager at <a href="mailto:webadmin@uoguelph.ca">webadmin@uoguelph.ca</a>.
            </p>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export const Head = () => <Seo title="404: Not Found" />

export default NotFoundPage
