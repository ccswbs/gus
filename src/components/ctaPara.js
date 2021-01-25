import PropTypes from 'prop-types';
import React from 'react';
import '../styles/cta.css';

function ctaPara (props) {
    return(
        <div class="row row-with-vspace site-content">
            <section class="col-md-9 content-area">
                <div class="cta border border-dark">
                    <h3>{props.pageData.field_cta_title}</h3>
                    {props.pageData.field_cta_description} <br />
                    <a href={props.pageData.field_cta_primary_link.uri} class="btn btn-uogRed">{props.pageData.field_cta_primary_link.title}</a>    					                        
                </div>
            </section>
        </div>
    )      
}

ctaPara.propTypes = {
    pageData: PropTypes.object,
}
  
ctaPara.defaultProps = {
    pageData: ``,
}

export default ctaPara
