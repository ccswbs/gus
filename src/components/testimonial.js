import React from "react"
import PropTypes from 'prop-types'
import Img from "gatsby-image"

function Testimonials ({ testimonialData }) {
	console.log(testimonialData);
	var testimonial;
	var testimonialList="";
	if (testimonialData !== null) {
		for (var i=0; i < testimonialData.length; i++) {
			    console.log(testimonialData[i]);
				testimonialList += 
				 "<li key=" + i + ">" + testimonialData[i].title +  "<br>" + testimonialData[i].body.value + "</li>" ;
				//<Img fluid={testimonialData[i].relationships.field_picture.localFile.childImageSharp.fluid} alt="" />;
				
		}
		
		testimonial = "<ul>" + testimonialList + "</ul>";

		return <div dangerouslySetInnerHTML={{__html: testimonial}}/>
	} else {
		return null
	}
}

Testimonials.propTypes = {
	testimonialData: PropTypes.arrayOf(PropTypes.string),
}

export default Testimonials