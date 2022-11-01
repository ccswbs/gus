import PropTypes from 'prop-types';
import TestimonialTitle from 'components/shared/testimonialTitle';
// this checks for the testimonial tags and returns an array that has all of the testimonial types included for this page.  
function TestimonialTags (props){

    if ((props.testimonialData !== null) && (props.testimonialData !== undefined)){
		const testimonialTitleInclude = () => props.testimonialData.map((testim) => {
			return (TestimonialTitle(testim.node))	
		})
		return ("return",testimonialTitleInclude())
	}

}

TestimonialTags.propTypes = {
	TestimonialTagsData: PropTypes.array,
}

TestimonialTags.defaultProps = {
    TestimonialTagsData: null,
}

export default TestimonialTags