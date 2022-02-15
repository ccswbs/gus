import PropTypes from 'prop-types';

function TestimonialTitle (props){
   let typeList = null;
   
   const testimonialTypeTitle= () => props.relationships.field_tags.map((testimonialType) => {
    if (testimonialType.__typename === 'taxonomy_term__testimonial_type') {

        switch(testimonialType.name) {
            case 'Faculty':
                return 'Faculty';
            case 'Alumni':
                return 'Alumni';
            case 'Graduate Student':
                return 'Graduate Student';
            case 'Undergraduate Student':
                return 'Undergraduate Student';
            default:
                return null;
        }
    } 
        return null;
    })

    typeList = testimonialTypeTitle()
   
    const highetstTestimonialType = (typeList.includes ('Faculty'))? ', Faculty' : 
        (typeList.includes ('Alumni'))? ', Alumni' : 
        (typeList.includes ('Graduate Student')) ? ', Graduate Student' : 
        (typeList.includes ('Undergraduate Student')) ? ', Undergraduate Student' : '';

    
    return highetstTestimonialType;

}

TestimonialTitle.propTypes = {
	testimonialTitleData: PropTypes.array,
}

TestimonialTitle.defaultProps = {
    testimonialTitleData: null,
}

export default TestimonialTitle