import React from "react"
import PropTypes from 'prop-types'
import Img from "gatsby-image"

function Testimonials ({ testimonialData }) {
	if ((testimonialData !== null) && (testimonialData !== undefined)) {
		return (
			<ul className="ug-testimonial">
              {testimonialData.map((testimonial, index) => {
				var testimonialPicture = testimonial.node.relationships.field_picture;
                return <li key={index}>
							{testimonialPicture && <Img fluid={testimonialPicture.localFile.childImageSharp.fluid} alt={testimonial.node.relationships.field_picture.alt} />}
							<h3>{testimonial.node.title}</h3>
							<div dangerouslySetInnerHTML={{__html: testimonial.node.body.value}} />
						</li>
              })}
            </ul>
		)

	} else {
		return null
	}
}

Testimonials.propTypes = {
	testimonialData: PropTypes.array,
}

Testimonials.defaultProps = {
    testimonialData: null,
}

export default Testimonials