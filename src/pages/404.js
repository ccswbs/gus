import React from "react"
import Seo from "../components/seo"
import Layout from 'components/layout';

const NotFoundPage = () => {
  return (
    <Layout>
      <div className="container page-container">
        <div className="site-content">
          <div className="content-area">
            <h1>HTTP 404 — File not found</h1>
            <p>
              <h3 class="text-dark">Possible reasons for this error:</h3>
            </p>
            <ol type="a">
              <li>
                You have clicked on an out-of-date bookmark. Once you find the correct page, please update your bookmark to avoid this error in the future.
              </li>

              <li>
                You have mis-typed the web address into the URL bar. Please check your spelling of the URL.
              </li>

              <li>
                The search engine has an out-of-date listing for this page - <a href="mailto:websites@uoguelph.ca">please let us know!</a>
              </li>

              <li>
                The university has removed this page (either by purpose or by mistake) - <a href="mailto:websites@uoguelph.ca">please let us know!</a>
              </li>
            </ol>
            <p>
              <h3 class="text-dark">Try one of these links instead:</h3>
            </p>

            <p>
              <a href="https://www.uoguelph.ca/">Go to the University of Guelph Home Page</a>
            </p>

            <p>
              <a href="https://www.uoguelph.ca/search">Search on the University of Guelph</a>
            </p>

          </div>
        </div>
      </div>
    </Layout>
  )
}

export const Head = () => <Seo title="404: Not Found" />

export default NotFoundPage
