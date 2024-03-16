import React from "react";
import PropTypes from "prop-types";
import { graphql, Script, useStaticQuery } from "gatsby";
import { Parser, ProcessNodeDefinitions } from "html-to-react";
//import GetFilePath from 'components/shared/getFilePath';

const GeneralText = (props) => {
    
  const urlData = useStaticQuery(graphql`
    query {
      sitePlugin(name: {eq: "gatsby-source-drupal"}) {
        pluginOptions
      }
    }
  `)
  const baseUrl = urlData.sitePlugin.pluginOptions.baseUrl.endsWith('/') 
                    ? urlData.sitePlugin.pluginOptions.baseUrl.slice(0, -1) 
                    : urlData.sitePlugin.pluginOptions.baseUrl;
  
  const parser = new Parser();
  
  const AnchorTag = ({ node, children }) => {
      //const [mediaFileID, setMediaFileID] = useState(null);
      //const setFilePath = useState(null);

      let newAttribs = {...node.attribs};

      // If href is internal and doesn't start with http or https, prepend baseUrl
      if (!newAttribs.href.startsWith('http')) {
        newAttribs.href = baseUrl + newAttribs.href;
      }

      // Remove any data-entity attributes
      for (let attr in newAttribs) {
        if (attr.startsWith('data-entity')) {
          delete newAttribs[attr];
        }
      }

      return <a {...newAttribs}>{children}</a>
  };
  
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
      // Process anchor tags to prepend baseUrl and remove data-entity attributes
      shouldProcessNode: (node) => node.name === "a",
      processNode: (node, children) => <AnchorTag node={node} children={children} />,
    },
    {
      // Process all other nodes with the default parser
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
  fragment MediaFileFragment on media__file {
    drupal_id
    relationships {
      field_media_file {
        filename
        publicUrl
      }
    }
  }
`
