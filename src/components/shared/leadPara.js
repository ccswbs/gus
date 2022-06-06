import PropTypes from 'prop-types';
import React from 'react';
import { graphql } from 'gatsby';

function leadPara (props) {

    const retStr = <div dangerouslySetInnerHTML={{ __html: props.pageData.field_lead_paratext?.value}} />
    const imageURL = props.pageData.relationships.field_lead_para_hero?.relationships.field_media_image?.publicUrl;
        
    if (imageURL) {
               
        const bgStyle = {			
            backgroundImage: `url(${imageURL})`,
            backgroundPosition: `center center`,
            backgroundRepeat: `no-repeat`,
            backgroundSize: `cover`,
        };
        
        const paraStyle = {
            background: `rgba(0,0,0,0.75)`,
            padding: `6rem`,
        };

        return (
            <React.Fragment>
               <div className="full-width-container"> 
                    <div className="row justify-content-end" style={bgStyle}>
                        <div className="col-md-6 text-white" style={paraStyle} dangerouslySetInnerHTML={{ __html: props.pageData.field_lead_paratext.value}} />
                    </div>
               </div> 
            </React.Fragment>
        )
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
          relationships {
            field_media_image {
              publicUrl
            }
          }
        }
      }
    }
`