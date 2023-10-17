import React from "react"
import PropTypes from "prop-types"
import { graphql, Script } from "gatsby"
import { Parser, ProcessNodeDefinitions } from "html-to-react"

const GeneralText = (props) => {
  const parser = new Parser()
  const instructions = [
    {
      shouldProcessNode: (node) => node.name === "script",
      processNode: (node) => <Script src={node?.attribs?.src} />,
    },
    {
      shouldProcessNode: () => true,
      processNode: new ProcessNodeDefinitions().processDefaultNode,
    },
  ]

  const processed = parser.parseWithInstructions(props.processed, () => true, instructions)
  const textClass = props.textClass

  return <div {...(textClass !== `` ? { className: textClass } : {})}>{processed}</div>
}

GeneralText.propTypes = {
  processed: PropTypes.string,
  textClass: PropTypes.string,
}

GeneralText.defaultProps = {
  processed: ``,
  textClass: ``,
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
    }
  }
`
