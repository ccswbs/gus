import PropTypes from 'prop-types';
import React from 'react';
import Img from 'gatsby-image';
import Widgets from './sectionWidgets';
import { contentExists } from '../utils/ug-utils';
import '../styles/customFooter.css';

function CustomFooter (props) {
	
	const footer = props.footerData;
	const footerLogos = (contentExists(footer.node.relationships.field_footer_logo) ? footer.node.relationships.field_footer_logo : null);
	const footerText = (contentExists(footer.node.body.processed) ? footer.node.body.processed : null);
	const footerWidgets = (contentExists(footer.node.relationships.field_widgets) ? footer.node.relationships.field_widgets : null);
		
	return (<>	
		<div className="full-width-container bg-light pre-footer">
			<div className="container page-container">
				<section className="row row-with-vspace site-content">
					{contentExists(footerLogos) &&
					<div className="col-md-3 content-area">
					{footerLogos.map(logo => (
						<Img className="footer-logo" fluid={logo.relationships.field_media_image.localFile.childImageSharp.fluid} alt={logo.field_media_image.alt} />
					))}
					</div>}
					<div className="col-md-9 content-area">
						<div className="container" dangerouslySetInnerHTML={{ __html: footerText}} />
						<Widgets pageData={footerWidgets} />
					</div>
				</section>			
			</div>
		</div>
	</>)
}
		
CustomFooter.propTypes = {
    footerData: PropTypes.object,
}
CustomFooter.defaultProps = {
    footerData: null,
}

export default CustomFooter