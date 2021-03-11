import PropTypes from 'prop-types';
import React from 'react';
import '../styles/cta.css';

function ctaPara (props) {
    let buttonClass = 'btn btn-secondary btn-block';
    let faIcon = 'fa-backpack';
    return(
        <div>
            {/* <section className="col-md-9 content-area"> */}
                <div className="">
                    {/* <h3>{props.pageData.field_cta_title}</h3>
                    {props.pageData.field_cta_description} <br /> */}
                    <a href={props.pageData.field_cta_primary_link.uri} className={buttonClass}>
                        <i aria-hidden="true" className="fas fa-backpack fa-pull-left" style="font-size: 5rem; color:var(--uog-yellow);"></i>
                        {props.pageData.field_cta_primary_link.title}</a>    					                        
                </div>
             {/* </section> */}
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
