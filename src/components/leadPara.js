import PropTypes from 'prop-types';
import React from 'react';
import Img from 'gatsby-image';
import { contentExists } from '../utils/ug-utils';
import '../styles/cta.css';

function leadPara (props) {

        const leaditem = props.pageData;

        const retStr = <div class="lead" dangerouslySetInnerHTML={{ __html: leaditem.field_lead_paratext.value}} />
        
                                
        if(contentExists(leaditem.relationships)) {
                            
            const img = (contentExists(leaditem.relationships.field_lead_para_hero) ? leaditem.relationships.field_lead_para_hero : ``) ; 
                            
            const heroImage = (contentExists(img) && contentExists(img.relationships) ? img.relationships.field_media_image.localFile : ``);
		    const pubImage = (contentExists(heroImage) ? encodeURI(heroImage.publicURL) : ``);
					
            let imageFile = null;
			    
            if(contentExists(img) && contentExists(heroImage)) {
	                           
                imageFile = <Img className="leadimg" fluid={heroImage.childImageSharp.fluid} alt={leaditem.relationships.field_lead_para_hero.field_media_image.alt} />
                               
 			       
            } 

            const myDivStyle = {
  			    display: 'flex', opacity: 0.8, 				
			    backgroundImage: `url(${pubImage})`
				                
  			};

                                                      
            if (imageFile !== null) {
                return (
			        <React.Fragment>
				       <div class="full-width-container"> 
			                <div className="container-fluid">
			                    <div className="row leadimg">

				                    <div className="col-md-6">{imageFile}</div>
			                        <div className="col-md-6" style={myDivStyle} >{retStr}</div>
				                        
				                </div>
			                </div>
				       </div> 
				        <br />

				    </React.Fragment>
			    )
                 
            } 

        }

        return retStr
                                        
}

leadPara.propTypes = {
    pageData: PropTypes.object,
}
  
leadPara.defaultProps = {
    pageData: ``,
}

export default leadPara
