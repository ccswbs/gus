import PropTypes from 'prop-types';

/**
* Return first type found in typeList from the types array. If no match found, return null. 
* The order of types in the array determines priority. The earlier a type appears, the higher its priority.
**/

function TestimonialTitle(props) {
    const typeList = props?.relationships.field_testimonial_type.map(testimonialType => testimonialType.name);
    const types = ['Faculty', 'Alumni', 'Graduate Student', 'Undergraduate Student'];

    return types.find(type => typeList.includes(type)) || null;
}

TestimonialTitle.propTypes = {
	testimonialTitleData: PropTypes.array,
}

TestimonialTitle.defaultProps = {
    testimonialTitleData: null,
}

export default TestimonialTitle