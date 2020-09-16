import React from 'react';
import PropTypes from 'prop-types';
import Img from 'gatsby-image';
import SliderResponsive from './sliderResponsive';
import { stripHTMLTags, setHeadingLevel } from '../utils/ug-utils.js';
import '../styles/testimonial.css';

function Testimonials (props) {
	let Heading = setHeadingLevel(props.headingLevel);

	if ((props.testimonialData !== null) && (props.testimonialData !== undefined)) {
		const testimonialUnits  = () => props.testimonialData.map((testimonial, index) => {
			var testimonialContent = stripHTMLTags(testimonial.body.processed);
			var testimonialPicture = testimonial.relationships.field_picture;
			return <div key={testimonial.drupal_id}>
				{testimonialPicture && <Img className="testimonial-pic" fluid={testimonialPicture.localFile.childImageSharp.fluid} alt={testimonial.relationships.field_picture.alt} />}
				<blockquote className="testimonial-quote" dangerouslySetInnerHTML={{__html: testimonialContent}} />
				<p className="testimonial-tagline">
					<strong className="testimonial-title">{testimonial.title}</strong>
					<br />
					<span className="testimonial-person-desc">{testimonial.field_testimonial_person_desc}</span>
				</p>
			</div>
		})

		return (
			<div className="ug-testimonial">
				<div className="full-width-container bg-light">
					<div className="container page-container">
						<section className="row row-with-vspace site-content">
							<div className="col-md-12 content-area" id="main-column">
								<Heading className="carousel-header">{props.heading}</Heading>
								<div className="testimonial-wrapper">
									<SliderResponsive addToControlLabel="Testimonial">{testimonialUnits()}</SliderResponsive>
								</div>
							</div>
						</section>
					</div>
				</div>
			</div>
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