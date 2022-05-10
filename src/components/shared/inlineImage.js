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
      return 'd-block img-fluid float-lg-start img-thumbnail mx-auto me-4 mt-1 mb-3'
    else if (clazz === 'align-right')
      return 'd-block img-fluid float-lg-end img-thumbnail mx-auto ms-4 mt-1 mb-3'
    else if (clazz === 'align-center')
      return 'd-block img-fluid img-thumbnail mx-auto mt-1 mb-3'
    else
      return clazz
  }

  const inlineFigureClass = (clazz) => {
    const c = 'figure border p-1';
    console.log(clazz)
    if (clazz && clazz.match(/align-left/g))
      return c + ' float-start mx-auto me-4 mt-1 mb-3'
    else if (clazz && clazz.match(/align-right/g))
      return c + ' float-end mx-auto ms-4 mt-1 mb-3'
    else if (clazz && clazz.match(/align-center/g))
      return c + ' mx-auto mt-1 mb-3'
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
      console.log(figclass)
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