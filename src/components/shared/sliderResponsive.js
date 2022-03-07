import React from 'react';
import Slider from 'react-slick';
import 'styles/sliderResponsive.css';
import 'slick-carousel/slick/slick.css';


function SliderArrow (props) {
	const { onClick } = props;
	let controlLabel = props.type === "next" ? "Next" : "Previous"; 
	controlLabel += props.addToControlLabel === "" ? "" : " " + props.addToControlLabel;
	let classNames = props.type === "next" ? "ug-slick-slider-control-next" : "ug-slick-slider-control-prev";
	let classNameIcon = classNames + "-icon ug-slick-slider-control-arrow-icon";
	classNames += " ug-slick-slider-control-arrow";

	return (
	  	<button className={classNames} onClick={onClick}>
			<span className={classNameIcon} aria-hidden="true"></span>
			<span className="sr-only">{controlLabel}</span>
		</button>
	);
}

export default class ResponsiveSlider extends React.Component {
    render() {
		let maxSlidesToShow = (this.props.children.length===1) ? 1:2;		
		const sliderSettings = {
			nextArrow: <SliderArrow type="next" addToControlLabel={this.props.addToControlLabel} />,
			prevArrow: <SliderArrow type="prev"addToControlLabel={this.props.addToControlLabel} />,
			dots: false,
			infinite: true,
			slidesToShow: maxSlidesToShow,
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
      return (
		<div className="ug-slick-slider">
			<div className="trans-gradient"></div>
			<Slider {...sliderSettings}>
				{this.props.children}
			</Slider>
		</div>
      );
    }
  }