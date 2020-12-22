import PropTypes from 'prop-types';
import React from 'react';
import { contentExists } from '../utils/ug-utils';
import '../styles/cta.css';

function leadPara (props) {

    if(contentExists(props.pageData) && props.pageData.length !== 0){
        
        return (
            <React.Fragment>
                {props.pageData.map (leaditem => {
                    if(contentExists(leaditem) && leaditem.__typename === 'paragraph__lead_paragraph'){
                            
                        return(
                            <div class="lead" dangerouslySetInnerHTML={{ __html: leaditem.field_lead_paratext.value}} />
                            
                        )
                    }
                    return null;
                })}
            </React.Fragment>
        )
        
    }
    return null;

}

leadPara.propTypes = {
    pageData: PropTypes.array,
}
  
leadPara.defaultProps = {
    pageData: ``,
}

export default leadPara
