import React from 'react';
import PropTypes from 'prop-types';
import { GatsbyImage } from "gatsby-plugin-image";
import SliderResponsive from './sliderResponsive';
import TestimonialTitle from './testimonialTitle';
import TestimonialTags from './testimonialTags';
import { contentExists, stripHTMLTags, setHeadingLevel } from '../../utils/ug-utils.js';
import '../../styles/testimonial.css';


function Testimonials (props) {

	let Heading = setHeadingLevel(props.headingLevel);
	const testimonialTags = TestimonialTags(props)

	let studentTag =testimonialTags.includes(', Graduate Student', ', Undergraduate Student')
	let facultyTag = testimonialTags.includes(', Faculty')
	let alumniTag = testimonialTags.includes(', Alumni')

	let testimonialHeading = studentTag && facultyTag && alumniTag ? "What Alumni, Students, and Faculty from the program are saying about U of G" : 
							   	studentTag && !facultyTag && !alumniTag ? "What Students from the program are saying about U of G" :
								studentTag && facultyTag && !alumniTag ? "What Students and Faculty from the program are saying about U of G":
								studentTag && !facultyTag && alumniTag ? "What Alumni and Students from the program are saying about U of G":
								!studentTag && facultyTag && alumniTag ? "What Alumni and Faculty from the program are saying about U of G":
								!studentTag && facultyTag && !alumniTag ? "What Faculty from the program are saying about U of G" :
								!studentTag && !facultyTag && alumniTag ? "What Alumni from the program are saying about U of G": "What Students in the program are saying about U of G"

	if ((props.testimonialData !== null) && (props.testimonialData !== undefined)) {
		const testimonialUnits  = () => props.testimonialData.map((testimonial) => {
		
			let testimonialContent = stripHTMLTags(testimonial.node.body.processed);
			let testimonialPicture = (contentExists(testimonial.node.relationships.field_hero_image)) ? testimonial.node.relationships.field_hero_image.relationships.field_media_image : null;
			let testimonialHomeProfileTitle= (contentExists(testimonial.node.field_home_profile)) ? testimonial.node.field_home_profile.title : null;
			let testimonialHomeProfileLink= (contentExists(testimonial.node.field_home_profile)) ? testimonial.node.field_home_profile.uri : null;
	
			const testimonialHomeProfile = () => {
				if (contentExists(testimonial.node.field_home_profile)){
					return( <a href= {testimonialHomeProfileLink}> {testimonialHomeProfileTitle} </a>)
					} 
					return null;
				};

			return (
                <div key={testimonial.node.drupal_id}>
                    {testimonialPicture && <GatsbyImage
                        image={testimonialPicture.localFile.childImageSharp.gatsbyImageData}
                        className="testimonial-pic"
                        alt={testimonial.node.relationships.field_hero_image.field_media_image.alt} />}
                    <blockquote className="testimonial-quote" dangerouslySetInnerHTML={{__html: testimonialContent}} />
                    <p className="testimonial-tagline">
                        <strong className="testimonial-title">{testimonial.node.title + TestimonialTitle(testimonial.node)}</strong>
                        <br />
                        <span className="testimonial-person-desc">{testimonial.node.field_testimonial_person_desc}</span>
                        <br/>
                        {testimonialHomeProfile()}
                    </p>
                </div>
            );
		})
		return (
			<div className="ug-testimonial">
				<div className="full-width-container bg-light">
					<div className="container page-container">
						<section className="row row-with-vspace site-content">
							<div className="col-md-12 content-area" id="main-column">
								<Heading className="carousel-header">{testimonialHeading }</Heading>
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