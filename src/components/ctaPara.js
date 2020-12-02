import PropTypes from 'prop-types';
import React from 'react';
import { Link } from 'gatsby';
import { contentExists } from '../utils/ug-utils';

function ctaPara (props) {

    if(contentExists(props.pageData) && props.pageData.length !== 0){
        
        return (
            <React.Fragment>
                {props.pageData.map (cta  => {
                    if(contentExists(cta)){
                            
                        return(
                           <div>
                                <h3>{cta.field_cta_description}</h3>
                                <Link to={cta.field_cta_primary_link.uri}>{cta.field_cta_primary_link.title}</Link>      					                        
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
