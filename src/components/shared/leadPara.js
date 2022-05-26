import PropTypes from 'prop-types';
import React from 'react';
import { graphql } from 'gatsby';
import { GatsbyImage } from "gatsby-plugin-image";
import { contentExists } from 'utils/ug-utils';
import 'styles/cta.css';

function leadPara (props) {

        const leaditem = props.pageData;

        const retStr = <div className="lead" dangerouslySetInnerHTML={{ __html: leaditem.field_lead_paratext.value}} />
        
                                
        if(contentExists(leaditem.relationships)) {
                            
            const img = (contentExists(leaditem.relationships.field_lead_para_hero) ? leaditem.relationships.field_lead_para_hero : ``) ; 
                            
            const heroImage = (contentExists(img) && contentExists(img.relationships) ? img.relationships.field_media_image.gatsbyImage : ``);
		    const pubImage = (contentExists(heroImage) ? encodeURI(heroImage.publicUrl) : ``);
					
            let imageFile = null;
			    
            if(contentExists(img) && contentExists(heroImage)) {
	                           
                imageFile = <GatsbyImage
                    image={heroImage.childImageSharp.gatsbyImageData}
                    className="leadimg"
                    alt={leaditem.relationships.field_lead_para_hero.field_media_image.alt} />
                               
 			       
            } 

            const myDivStyle = {
  			    display: 'flex', opacity: 0.8, 				
			    backgroundImage: `url(${pubImage})`
				                
  			};

                                                      
            if (imageFile !== null) {
                return (
			        <React.Fragment>
				       <div className="full-width-container"> 
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

export const query = graphql`
    fragment LeadParagraphFragment on paragraph__lead_paragraph {
      id
      field_lead_paratext {
        value
      }
      relationships {
        field_section_column {
          name
        }
        field_lead_para_hero {
          field_media_image {
            alt
          }
          relationships {
            field_media_image {
              publicUrl
              gatsbyImage(
                width: 1000
                placeholder: BLURRED
                layout: FULL_WIDTH
              )
            }
          }
        }
      }
    }
`