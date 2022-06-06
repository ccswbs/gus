import React from 'react';
import PropTypes from 'prop-types';
import { GatsbyImage, getImage } from "gatsby-plugin-image";

function Employers (props) {
    return (<>
    <ul className="no-icon row">
        {props.employerData.map (employer => {
            let employerImage = getImage(employer.node.relationships.field_image);
            let employerImageAlt = employer.node.field_image_alt ? employer.node.field_image_alt : ``;
            let employerSummary = employer.node.field_employer_summary;
            let employerJobPostingsLink = employer.node.field_link?.uri;
            return (                
                <li key={employer.node.drupal_id} className="card border-0 col-md-6 col-lg-4 flex-row">
                    {employerImage && 
                    <div className="col-2 col-md-3 p-1 p-md-3">
                        <GatsbyImage
                            image={employerImage}
                            imgStyle={{ objectFit: 'contain' }}
                            alt={employerImageAlt} />
                    </div>}
                    <div className="card-body col-11 col-md-9">
                        <h4 className="m-0 text-dark">{employer.node.title}</h4>
                        {employerSummary && <div dangerouslySetInnerHTML={{__html: employerSummary.processed}} />}
                        {employerJobPostingsLink && <a href={employerJobPostingsLink}>Current Job Postings<span className="visually-hidden"> for {employer.node.title}</span></a>}                    
                    </div>
                </li>);
        })}
    </ul></>)
}


Employers.propTypes = {
	employerData: PropTypes.array,
}

Employers.defaultProps = {
    employerData: null,
}

export default Employers