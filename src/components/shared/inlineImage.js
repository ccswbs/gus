import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import HTMLReactParser, { domToReact } from "html-react-parser"
import { propTypes } from "react-bootstrap/esm/Image"

function InlineImage(processed) {

  const data = useStaticQuery(graphql`
    query {
      sitePlugin(name: {eq: "gatsby-source-drupal"}) {
        pluginOptions
      }
    }
  `)

  const inlineImageSrc = (src, base) => {
    if (src.charAt(0) === '/') 
      return `${base}${src.substring(1)}`
    else
      return src
  }

  const inlineImageClass = (clazz) => {
    if (clazz === 'align-left')
      return 'd-block img-fluid float-lg-left img-thumbnail mx-auto mr-lg-4 mt-1 mb-3'
    else if (clazz === 'align-right')
      return 'd-block img-fluid float-lg-right img-thumbnail mx-auto ml-lg-4 mt-1 mb-3'
    else if (clazz === 'align-center')
      return 'd-block img-fluid float-lg-center img-thumbnail mx-auto ml-lg-4 mt-1 mb-3'
    else
      return clazz
  }

  const inlineFigureClass = (clazz) => {
    const c = 'figure border p-1';
    if (clazz && clazz.match(/align-left/g))
      return c + ' align-left mx-auto mr-lg-4 mt-1 mb-3'
    else if (clazz && clazz.match(/align-right/g))
      return c + ' align-right mx-auto ml-lg-4 mt-1 mb-3'
    else if (clazz && clazz.match(/align-centre/g))
      return c + ' align-centre mx-auto ml-lg-4 mt-1 mb-3'
    else
      return c
  }

  const replaceInlineImages = (domNode, baseUrl) => {
    if (domNode.name === 'img') {
      const src = domNode.attribs['src'];
      const clazz = domNode.attribs['class'];
      const imgClass = inlineImageClass(clazz);
      const imgSrc   = inlineImageSrc(src, baseUrl);
      const width    = domNode.attribs['width'];
      const height   = domNode.attribs['height'];
      const alt      = domNode.attribs['alt'];
      return <>
        <img src={imgSrc} alt={alt} className={imgClass} width={width} height={height} />
       </>
    }
    if (domNode.name === 'figure') {
      const clazz = domNode.attribs['class'];
      const figclass = inlineFigureClass(clazz);
      return <figure className={figclass}>
        {domNode.children.map(child => replaceInlineImages(child, baseUrl))}
      </figure>
    }
    if (domNode.name === 'figcaption') {
      return <figcaption class="figure-caption">
        {domToReact(domNode.children)}
      </figcaption>
    }
    return undefined
  }

  const renderProcessed = () => {
    const baseUrl = data.sitePlugin.pluginOptions.baseUrl;
        if (typeof processed !== 'string') {
        return <></>;
        }
        const parsed = HTMLReactParser(processed, {
        replace: domNode => replaceInlineImages(domNode, baseUrl)
        })
        return parsed;
  
  }

 return renderProcessed ()
}
InlineImage.propTypes = {
    processed: propTypes.string,
}

InlineImage.defaultProps = {
    processed: ``,
}

export default InlineImage