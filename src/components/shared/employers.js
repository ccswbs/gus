import React from 'react';
import PropTypes from 'prop-types';
import { GatsbyImage } from "gatsby-plugin-image";
import 'styles/employers.css';

function Employers (props) {
    return (
        <div className="container">
                <div className="row">
                    {props.employerData.map (unit => {
                        let employerImage = unit.node.relationships.field_image;
                        let employerImageAlt = unit.node.field_image_alt ? unit.node.field_image_alt : ``;
                        let employerSummary = unit.node.field_employer_summary;
                        let employerJobPostingsLink = unit.node.field_link ? unit.node.field_link.uri : null;
                        return (
                            <div className="col-6 col-md-4" key={unit.node.drupal_id}>
                                    <div className="employer-wrapper">
                                    {employerImage && employerImage.localFile && <div className="employer-pic">
                                        <GatsbyImage
                                            image={employerImage.localFile.childImageSharp.gatsbyImageData}
                                            imgStyle={{ objectFit: 'contain' }}
                                            alt={employerImageAlt} />
                                    </div>}
                                    <div className="employer-info">
                                        <h4 className="employer-name">{unit.node.title}</h4>
                                        {employerSummary && <div dangerouslySetInnerHTML={{__html: employerSummary.processed}} />}
                                        {employerJobPostingsLink && <p><a href={unit.node.field_link.uri}>Current Job Postings<span className="sr-only"> for {unit.node.title}</span></a></p>}
                                    </div>
                                    </div>
                                </div>
                        );
                        })}
                    </div>
                </div>
    );
}

Employers.propTypes = {
	employerData: PropTypes.array,
}

Employers.defaultProps = {
    employerData: null,
}

export default Employers