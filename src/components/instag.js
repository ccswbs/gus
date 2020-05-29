import React from "react"
import { StaticQuery, graphql } from 'gatsby'

class Instagram extends React.Component {
    render () {
      return (
        <React.Fragment>
          {this.props.instaNodes.edges && (
            <div className="ug-instagram">
              {this.props.instaNodes.edges.map((edge) => {
                return <p><img src={edge.node.original} alt="" width="250" height="250" /> {edge.node.caption} </p>
              })}
            </div>
          )}
        </React.Fragment>
      )
    }
  }

  export default () => (
    <StaticQuery
      query={graphql`
        query {
            allInstaNode(limit: 3) {
                edges {
                    node {
                        original
                        caption
                    }
                }
            }
        }
      `}
      render={(data) => (
        <Instagram instaNodes={data.allInstaNode} />
      )}
    />
  )