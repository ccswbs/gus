import PropTypes from 'prop-types';
import React from 'react';
import { GatsbyImage } from "gatsby-plugin-image";
import OVCFooterSocial from 'components/blocks/ovc/footerSocial';
import Widget from 'components/shared/widget';
import { contentExists } from 'utils/ug-utils';
import 'styles/customFooter.css';

function OVCCustomFooter (props) {
	
	const footer = props.footerData;
	const footerLogos = (contentExists(footer.node.relationships.field_footer_logo) ? footer.node.relationships.field_footer_logo : null);
	const footerText = (contentExists(footer.node.body.processed) ? footer.node.body.processed : null);
	const footerWidgets = (contentExists(footer.node.relationships.field_widgets) ? footer.node.relationships.field_widgets : null);
		
	return <>	
		<div className="full-width-container bg-light pre-footer">
			<div className="container page-container">
				<section className="row row-with-vspace site-content">
					{contentExists(footerLogos) &&
					<div className="col-md-4 content-area">
					{footerLogos.map(logo => (
						<GatsbyImage
                            image={logo.relationships.field_media_image.gatsbyImage}
                            className="footer-logo"
                            alt={logo.field_media_image.alt} />
					))}
                    <OVCFooterSocial />
					</div>}
					<div className="col-md-8 content-area">
						<div className="container" dangerouslySetInnerHTML={{ __html: footerText}} />
						<Widget pageData={footerWidgets} />
					</div>
				</section>			
			</div>
		</div>
	</>;
}
		
OVCCustomFooter.propTypes = {
    footerData: PropTypes.object,
}
OVCCustomFooter.defaultProps = {
    footerData: null,
}

export default OVCCustomFooter