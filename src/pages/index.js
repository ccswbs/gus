import React from "react"
import Layout from '../components/layout'
import SEO from '../components/seo'

class IndexPage extends React.Component {
    render() {
      return(
        <Layout>
          <SEO title="Home" keywords={[`gatsby`, `application`, `react`]} />
          <main>
            <h1>Gatsby UG Starter Theme</h1>
            <p>The University of Guelph, and everyone who studies here, explores here, teaches here and works here, is committed to one simple purpose: To Improve Life.</p>
          </main>
        </Layout>
    )
  }
}

export default IndexPage