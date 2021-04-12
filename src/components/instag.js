import React from "react"
import { StaticQuery, graphql } from 'gatsby'

class Instagram extends React.Component {
    render () {
      return (
        <React.Fragment>
          {this.props.instaNodes.edges.length > 0 && (
            <ul className="ug-instagram">
              {this.props.instaNodes.edges.map((edge, index) => {
                return <li key={index}><img src={edge.node.original} alt="" width="250" height="250" /> {edge.node.caption} </li>
              })}
            </ul>
          )}
        </React.Fragment>
      )
    }
  }
// Modified function to remove warning  --> Anonymous arrow functions cause Fast Refresh to not preserve local component state.

										// Please add a name to your function, for example:

										// Before:
										// export default () => {}

										// After:
										// const Named = () => {}
										// export default Named;

const instag = () => (
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
  export default instag;