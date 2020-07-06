import React from "react"
import PropTypes from 'prop-types'
import Img from "gatsby-image"

function Testimonials ({ testimonialData }) {
	
	if (testimonialData !== null) {
		
		return (
			<ul className="ug-testimonial">
              {testimonialData.map((node, index) => {
                return <li key={index}><Img fluid={node.relationships.field_picture.localFile.childImageSharp.fluid} alt={node.relationships.field_picture.alt} /> <h3>{node.title}</h3> <div dangerouslySetInnerHTML={{__html: node.body.value}} /></li>
              })}
            </ul>
		)

	} else {
		return null
	}
}

Testimonials.propTypes = {
	testimonialData: PropTypes.arrayOf(PropTypes.string),
}

export default Testimonials