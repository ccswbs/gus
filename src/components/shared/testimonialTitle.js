import PropTypes from 'prop-types';

function TestimonialTitle (props){
    let typeList = props?.relationships.field_testimonial_type.map((testimonialType) => {
		return testimonialType.name;
	})

	let highestTestimonialType = typeList.includes('Faculty') ? 'Faculty' : 
			typeList.includes('Alumni') ? 'Alumni' : 
			typeList.includes('Graduate Student') ? 'Graduate Student' : 
			typeList.includes('Undergraduate Student') ? 'Undergraduate Student' : null;

	return highestTestimonialType;
}

TestimonialTitle.propTypes = {
	testimonialTitleData: PropTypes.array,
}

TestimonialTitle.defaultProps = {
    testimonialTitleData: null,
}

export default TestimonialTitle