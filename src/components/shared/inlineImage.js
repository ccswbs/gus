import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import HTMLReactParser, { domToReact } from "html-react-parser"
import { propTypes } from "react-bootstrap/esm/Image"

// This Function will take a string that contains HTML tags and parce it to add the BASEURL (environmental variable)
// to the begining of the image source tag so that inline images placed by Drupal will have the proper URL. 
// It will deal with the regular img tag as well as the figure tag (with caption) aswell as float the image start (left)
// or end (right), or centre. The appropriate classes are added to format the image and add space between it and the text.
// 
// InlineImage() function will return an array of HTML tags that can be displayed directly. 



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
      return 'd-block float-md-start mx-auto me-4 mt-1 mb-3'
    else if (clazz === 'align-right')
      return 'd-block float-md-end mx-auto ms-4 mt-1 mb-3'
    else if (clazz === 'align-center')
      return 'd-block mx-auto mt-1 mb-3'
    else
      return " img-fluid" + clazz
  }

  const inlineFigureClass = (clazz) => {
    const c = 'figure p-1';
    if (clazz && clazz.match(/align-left/g))
      return c + ' float-start mx-auto me-4 mt-1 mb-3'
    else if (clazz && clazz.match(/align-right/g))
      return c + ' float-end mx-auto ms-4 mt-1 mb-3'
    else if (clazz && clazz.match(/align-center/g))
      return c + ' d-block text-center mx-auto mt-1 mb-3'
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
      return <img src={imgSrc} alt={alt} className={imgClass} width={width} height={height} />
    }
    if (domNode.name === 'figure') {
      const clazz = domNode.attribs['class'];
      const figclass = inlineFigureClass(clazz);
      return <figure className={figclass}>
        {domNode.children.map(child =>  replaceInlineImages(child, baseUrl))}
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