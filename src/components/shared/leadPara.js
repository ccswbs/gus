import PropTypes from 'prop-types';
import React from 'react';
import { graphql } from 'gatsby';
import styled from 'styled-components';

const StyledBG = styled.div`
    background-image: url(${props => props.imageURL});
    background-position: center center;
    background-repeat: no-repeat;
    background-size: cover;
`
const StyledText = styled.div`
    background: rgba(0,0,0,0.75);
    padding: 6rem;
`

function LeadPara (props) {
    
    const paraBG = props.pageData?.relationships?.field_lead_para_hero?.relationships.field_media_image?.publicUrl;
    const paraText = props.pageData.field_lead_paratext?.value;
    
    if (paraBG) {               
        return (
            <React.Fragment>
               <div className="full-width-container"> 
                    <StyledBG className="container-fluid justify-content-end pe-0 row" imageURL={paraBG}>
                        <StyledText className="col-md-6 text-white" dangerouslySetInnerHTML={{ __html: paraText}} />
                    </StyledBG>
               </div> 
            </React.Fragment>
        )
    }
    return <div dangerouslySetInnerHTML={{ __html: paraText}} />
}

LeadPara.propTypes = {
    pageData: PropTypes.object,
}
  
LeadPara.defaultProps = {
    pageData: ``,
}

export default LeadPara

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