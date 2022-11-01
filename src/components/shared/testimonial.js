import React from 'react';
import { graphql } from 'gatsby';
import PropTypes from 'prop-types';
import { GatsbyImage, getImage } from "gatsby-plugin-image";
import SliderResponsive from 'components/shared/sliderResponsive';
import TestimonialTitle from 'components/shared/testimonialTitle';
import TestimonialTags from 'components/shared/testimonialTags';
import { stripHTMLTags, setHeadingLevel } from 'utils/ug-utils.js';
import 'styles/testimonial.css';


function Testimonials (props) {

	let Heading = setHeadingLevel(props.headingLevel);
	const testimonialTags = TestimonialTags(props)

	let studentTag = testimonialTags.includes(', Graduate Student', ', Undergraduate Student')
	let facultyTag = testimonialTags.includes(', Faculty')
	let alumniTag = testimonialTags.includes(', Alumni')

	let testimonialHeading = studentTag && facultyTag && alumniTag ? "What Alumni, Students, and Faculty from the program are saying about U of G" : 
								studentTag && !facultyTag && !alumniTag ? "What Students from the program are saying about U of G" :
								studentTag && facultyTag && !alumniTag ? "What Students and Faculty from the program are saying about U of G":
								studentTag && !facultyTag && alumniTag ? "What Alumni and Students from the program are saying about U of G":
								!studentTag && facultyTag && alumniTag ? "What Alumni and Faculty from the program are saying about U of G":
								!studentTag && facultyTag && !alumniTag ? "What Faculty from the program are saying about U of G" :
								!studentTag && !facultyTag && alumniTag ? "What Alumni from the program are saying about U of G": "What Students in the program are saying about U of G"

	if (props.testimonialData?.length > 0) {
		const testimonialUnits  = () => props.testimonialData.map((testimonial) => {
		
			let testimonialName = testimonial.node.field_testimonial_person_name ?? testimonial.node.title;
			let testimonialContent = stripHTMLTags(testimonial.node.body.processed);
			let testimonialPicture = getImage(testimonial.node.relationships.field_hero_image?.relationships.field_media_image);
			let testimonialHomeProfileTitle = testimonial.node.field_home_profile?.title;
			let testimonialHomeProfileLink= testimonial.node.field_home_profile?.uri;
    
			const testimonialHomeProfile = () => {
				if (testimonial.node.field_home_profile) {
					return <a href= {testimonialHomeProfileLink}> {testimonialHomeProfileTitle} </a>
				} 
				return null;
			};

			return (
                <div key={testimonial.node.drupal_id}>
                    {testimonialPicture && <GatsbyImage
                        image={testimonialPicture}
                        className="testimonial-pic"
                        alt={testimonial.node.relationships.field_hero_image.field_media_image.alt} />}
                    <blockquote className="testimonial-quote" dangerouslySetInnerHTML={{__html: testimonialContent}} />
                    <p className="testimonial-tagline">
                        <strong className="testimonial-title">{testimonialName + TestimonialTitle(testimonial.node)}</strong>
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
								<Heading className="carousel-header text-dark">{testimonialHeading}</Heading>
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