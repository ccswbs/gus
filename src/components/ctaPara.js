import PropTypes from 'prop-types';
import React from 'react';
import { Link } from 'gatsby';
import { contentExists } from '../utils/ug-utils';
import '../styles/cta.css';

function ctaPara (props) {

    if(contentExists(props.pageData) && props.pageData.length !== 0){
        
        return (
            <React.Fragment>
                {props.pageData.map (cta  => {
                    if(contentExists(cta)){
                            
                        return(
                           <div class="cta border border-dark">
                                <h3>{cta.field_cta_title}</h3>
						        {cta.field_cta_description} <br />
					            <a href={cta.field_cta_primary_link.uri} class="btn btn-uogRed">{cta.field_cta_primary_link.title}</a>      					                        
                            </div>
                        )
                    }
                        return null;
                })}
            </React.Fragment>
        )
        
    }
    return null;

}

ctaPara.propTypes = {
    pageData: PropTypes.array,
}
  
ctaPara.defaultProps = {
    pageData: ``,
}

export default ctaPara
