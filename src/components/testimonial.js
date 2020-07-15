import React from "react"
import PropTypes from 'prop-types'
import Img from "gatsby-image"
import { stripHTMLTags } from '../utils/ug-utils.js'
import "../styles/testimonial.css"

function Testimonials ({ testimonialData, heading }) {

	if ((testimonialData !== null) && (testimonialData !== undefined)) {
		return (
			<div className="ug-testimonial">
				<div className="full-width-container bg-light">
					<div className="container page-container">
						<div id="content" className="row row-with-vspace site-content">
							<div className="col-md-12 content-area" id="main-column">
								<h3 className="carousel-header">{heading}</h3>
								<div id="carouselExampleControls" className="carousel slide" data-ride="carousel">
									
									<div className="carousel-inner">
										
										<div className="carousel-item active">
											<div className="testimonial-wrapper">
												{testimonialData.map((testimonial, index) => {
													var testimonialContent = stripHTMLTags(testimonial.node.body.value);
													var testimonialClass = ((index % 2 === 0) ? `left` : `right`);
													var testimonialPicture = testimonial.node.relationships.field_picture;
													return <div className={testimonialClass} key={index}>
																{/* <li key={index}> */}
																	{testimonialPicture && <Img fluid={testimonialPicture.localFile.childImageSharp.fluid} alt={testimonial.node.relationships.field_picture.alt} />}
																	<blockquote dangerouslySetInnerHTML={{__html: testimonialContent}} />
																	<p className="tagline">
																		<strong>{testimonial.node.title}</strong>
																		<br />
																		<span>{testimonial.node.field_testimonial_person_desc}</span>
																	</p>
																	

																{/* </li> */}
															</div>
												})}
											</div>
										</div>

									</div>
									<a className="carousel-control-prev" href="#carouselExampleControls" role="button" data-slide="prev">
										<span className="carousel-control-prev-icon" aria-hidden="true"></span>
										<span className="sr-only">Previous</span>
									</a>
									<a className="carousel-control-next" href="#carouselExampleControls" role="button" data-slide="next">
										<span className="carousel-control-next-icon" aria-hidden="true"></span>
										<span className="sr-only">Next</span>
									</a>
								</div>
							</div>
						</div>
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