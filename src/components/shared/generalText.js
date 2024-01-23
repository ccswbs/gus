import React from "react"
import PropTypes from "prop-types"
import { graphql, Script } from "gatsby"
import { Parser, ProcessNodeDefinitions } from "html-to-react"
import TaggedContent from 'components/shared/taggedContent';

const GeneralText = (props) => {
  const parser = new Parser()
  const instructions = [
    {
      // Replace <script> tags with Gatsby <Script> components
      shouldProcessNode: (node) => node.name === "script" && node.attribs?.src,
      processNode: (node) => <Script src={node.attribs.src} />,
    },
    {
      // Inline scripts will also be replaced but should only have one child, which is the script text
      shouldProcessNode: (node) => node.name === "script" && node?.children.length === 1,
      processNode: (node) => <Script>{node.children[0].data}</Script>,
    },
    {
      // Process all other nodes with the default parser
      shouldProcessNode: () => true,
      processNode: new ProcessNodeDefinitions().processDefaultNode,
    },
  ]

  const processed = parser.parseWithInstructions(props.textData.field_general_text?.processed, () => true, instructions)
  //const textClass = props.textClass

  return (<>
        <div>{processed}</div>
        <TaggedContent contentType={props.textData.relationships?.field_tagged_content?.field_content_type} tags={props.textData.relationships?.field_tagged_content?.relationships?.field_tags} />
    </>)
}

GeneralText.propTypes = {
  textData: PropTypes.object,
}

GeneralText.defaultProps = {
  textData: ``,
}

export default GeneralText

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
      field_tagged_content {
        field_content_type
        relationships {
          field_tags {
            __typename
            ... on TaxonomyInterface {
              name
            }
          }
        }
      }
    }
  }
`
