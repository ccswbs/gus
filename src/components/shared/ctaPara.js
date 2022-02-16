import PropTypes from 'prop-types';
import React from 'react';
import { graphql } from 'gatsby';
import 'styles/cta.css';

function ctaPara (props) {
   
    return(
        <div className="row row-with-vspace site-content">
            <section className="col-md-9 content-area">
                <div className="cta border border-dark">
                    <h3>{props.pageData.field_cta_title}</h3>
                    {props.pageData.field_cta_description} <br />
                    <a href={props.pageData.field_cta_primary_link.uri} className="btn btn-uogRed">{props.pageData.field_cta_primary_link.title}</a>    					                        
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

export const query = graphql`
  fragment CallToActionParagraphFragment on paragraph__call_to_action {
    id
    field_cta_title
    field_cta_description
    field_cta_primary_link {
      title
      uri
    }
    relationships {
      field_section_column {
        name
      }
    }
  }
`