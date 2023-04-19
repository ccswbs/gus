import React from 'react';
import { graphql } from 'gatsby';
import PropTypes from 'prop-types';
import { GatsbyImage, getImage } from "gatsby-plugin-image";
import SliderResponsive from 'components/shared/sliderResponsive';
import TestimonialTitle from 'components/shared/testimonialTitle';
import { stripHTMLTags, setHeadingLevel } from 'utils/ug-utils.js';
import 'styles/testimonial.css';

function setTestimonialHeading (props) {
	// heading passed through prop
	if( props.heading ) {
		return props.heading;
	}

	// heading generated for program page
	if ( props.programAcronym ) {
		const testimonialTags = props.testimonialData.flatMap((testim) => {
			let tag = TestimonialTitle(testim.node ?? testim);
			return tag ?? [];
		})

		let studentTag = testimonialTags.includes('Graduate Student', 'Undergraduate Student')
		let facultyTag = testimonialTags.includes('Faculty')
		let alumniTag = testimonialTags.includes('Alumni')
	
		// Testimonial heading generated for program pages
		let testimonialHeading = studentTag && facultyTag && alumniTag ? "Alumni, Students, and Faculty from the program" : 
			studentTag && !facultyTag && !alumniTag ? "Students from the program" :
			studentTag && facultyTag && !alumniTag ? "Students and Faculty from the program":
			studentTag && !facultyTag && alumniTag ? "Alumni and Students from the program":
			!studentTag && facultyTag && alumniTag ? "Alumni and Faculty from the program":
			!studentTag && facultyTag && !alumniTag ? "Faculty from the program" :
			!studentTag && !facultyTag && alumniTag ? "Alumni from the program" : "Students in the program"
	
		return ("What " + testimonialHeading + " are saying about U of G");
	}
}

function Testimonials (props) {
	let Heading = setHeadingLevel(props.headingLevel);
	let testimonialHeading = setTestimonialHeading(props)

	if (props.testimonialData?.length > 0) {
		const testimonialUnits  = () => props.testimonialData.map((testimonial) => {
			// program queries are nested under .node and widget queries are not
			let testimonialNode = testimonial.node ?? testimonial;
			let testimonialName = testimonialNode.field_testimonial_person_name ?? testimonialNode.title;
			let testimonialTitle = TestimonialTitle(testimonialNode);
			let testimonialContent = stripHTMLTags(testimonialNode.body.processed);
			let testimonialPicture = getImage(testimonialNode.relationships.field_hero_image?.relationships.field_media_image);
    
			const testimonialHomeProfile = () => {
				let testimonialHomeProfileTitle = (testimonialNode.field_home_profile?.title === "") ? "Associated Profile" : testimonialNode.field_home_profile?.title;
				let testimonialHomeProfileLink = testimonialNode.field_home_profile?.uri;

				if (testimonialHomeProfileLink) {
					return <a href= {testimonialHomeProfileLink}>{testimonialHomeProfileTitle}</a>
				} 
				return null;
			};

			return (
				<div key={testimonialNode.drupal_id}>
					{testimonialPicture && 
						<GatsbyImage image={testimonialPicture}
							className="testimonial-pic"
							alt={testimonialNode.relationships.field_hero_image.field_media_image.alt} />}
					<blockquote className="testimonial-quote mb-0" dangerouslySetInnerHTML={{__html: testimonialContent}} />
					<p className="testimonial-tagline author">
						<strong className="testimonial-title">{testimonialName}{testimonialTitle ? ', ' + testimonialTitle : '' }</strong>
						<br />
						<span className="testimonial-person-desc">{testimonialNode.field_testimonial_person_desc}</span>
						<br/>
						{testimonialNode.field_home_profile && testimonialHomeProfile()}
					</p>
				</div>
		);
		})
		return (
			<div className="ug-testimonial">
				<div className="full-width-container bg-light">
					<div className="container page-container">
						<section className="row row-with-vspace site-content">
							<div className="col-md-12 content-area">
								{testimonialHeading && <Heading className="carousel-header text-dark">{testimonialHeading}</Heading>}
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


export const query = graphql`
	fragment TestimonialNodeFragment on node__testimonial {
		changed
		drupal_id
		body {
			processed
		}
		title
		field_testimonial_person_name
		field_testimonial_person_desc
		field_home_profile {
			title
			uri
		}
		relationships {
			field_hero_image {
				field_media_image {
					alt
				}
				relationships {
					field_media_image {
						gatsbyImage(
							width: 400
							height: 400
							placeholder: BLURRED
							layout: CONSTRAINED
						)
					}
				}
			}
			field_testimonial_type {
				drupal_id
				id
				name
			}
			field_tags {
				__typename
				... on TaxonomyInterface {
					drupal_id
					id
					name
				}
			}
		}
	}
`