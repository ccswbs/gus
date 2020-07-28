import React from "react"
import PropTypes from 'prop-types'
import Img from "gatsby-image"
import Slider from "react-slick";
import { stripHTMLTags } from '../utils/ug-utils.js'
import "../styles/testimonial.css"
import "slick-carousel/slick/slick.css";

function CarouselArrow (props) {
	const { onClick } = props;
	let arrowText = props.type === "next" ? "Next" : "Previous";
	let classNames = props.type === "next" ? "ug-slick-carousel-control-next" : "ug-slick-carousel-control-prev";
	let classNameIcon = classNames + "-icon ug-slick-carousel-control-arrow-icon";
	classNames += " ug-slick-carousel-control-arrow";

	return (
	  	<button className={classNames} onClick={onClick}>
			<span className={classNameIcon} aria-hidden="true"></span>
			<span className="sr-only">{arrowText}</span>
		</button>
	);
  }

function Testimonials ({ testimonialData, heading }) {

    const sliderSettings = {
		nextArrow: <CarouselArrow type="next" />,
		prevArrow: <CarouselArrow type="prev" />,
		dots: false,
		slidesToShow: 2,
		slidesToScroll: 1,
		responsive: [
			{
				breakpoint: 768,
				settings: {
				slidesToShow: 1,
				slidesToScroll: 1,
				infinite: true,
				dots: false
				}
			}
		]
	  };

	if ((testimonialData !== null) && (testimonialData !== undefined)) {
		const testimonialUnits  = () => testimonialData.map((testimonial, index) => {
			var testimonialContent = stripHTMLTags(testimonial.node.body.value);
			var testimonialPicture = testimonial.node.relationships.field_picture;
			return <div className="ug-slick-item" key={testimonial.node.drupal_id}>
				{testimonialPicture && <Img fluid={testimonialPicture.localFile.childImageSharp.fluid} alt={testimonial.node.relationships.field_picture.alt} />}
				<blockquote dangerouslySetInnerHTML={{__html: testimonialContent}} />
				<p className="tagline">
					<strong>{testimonial.node.title}</strong>
					<br />
					<span>{testimonial.node.field_testimonial_person_desc}</span>
				</p>
			</div>
		})

		return (
			<div className="ug-testimonial">
				<div className="full-width-container bg-light">
					<div className="container page-container">
						<section className="row row-with-vspace site-content">
							<div className="col-md-12 content-area" id="main-column">
								<h3 className="carousel-header">{heading}</h3>
								<div className="ug-slick-carousel">
									<div className="testimonial-wrapper">
										<Slider {...sliderSettings}>{testimonialUnits()}</Slider>
									</div>
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