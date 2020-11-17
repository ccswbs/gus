import React from 'react';
import { contentExists } from '../utils/ug-utils';

//const menuData = require('../../config/sitemaps/' + getSocial(menus) + '.yml');

function Footer() {
	
	const config = require('../../gatsby-config');
	const menus = config.siteMetadata.menus;
	let socialMenu;
	
	if (contentExists(menus)) {
		for (let i=0; i<menus.length; i++) {
			if (menus[i] === "ug-social-media") {
				socialMenu = menus[i];
			}
		}
		const menuData = require('../../config/sitemaps/' + socialMenu + '.yml');
		console.log(menuData);
	}
		
	return (<div className="footer-wrapper">
		<div className="container">
			<footer className="navbar navbar-default">
				<div className="row">
					<div className="col-md-4 col-lg-3 col-sm-12">
						<a href="https://uoguelph.ca/improve-life" className="il-link">
							<img src="https://www.uoguelph.ca/img/improve-life.svg" alt="Improve Life" className="footer-tagline" />
						</a>
						<ul id="socialicons" className="nav navbar-nav navbar-left col-md-4 col-sm-12">
							<li><a aria-label="twitter" href="http://twitter.com/uofg">
								<i className="fab fa-twitter" aria-hidden="true"></i><span className="sr-only">Twitter</span></a></li>
							<li><a aria-label="facebook" href="https://www.facebook.com/uofguelph">
								<i className="fab fa-facebook" aria-hidden="true"></i><span className="sr-only">Facebook</span></a></li>
							<li><a aria-label="instagram" href="https://instagram.com/uofguelph/">
								<i className="fab fa-instagram" aria-hidden="true"></i><span className="sr-only">Instagram</span></a></li>
							<li><a aria-label="youtube" href="https://www.youtube.com/uofguelph">
								<i className="fab fa-youtube" aria-hidden="true"></i><span className="sr-only">YouTube</span></a></li>
							<li><a aria-label="linkedin" href="https://www.linkedin.com/company/university-of-guelph">
								<i className="fab fa-linkedin" aria-hidden="true"></i><span className="sr-only">LinkedIn</span></a></li>
							<li className="smdirectory"><a href="http://www.uoguelph.ca/web/socialmedia/">Social Media Directory</a></li>
						</ul>
						<a href="//www.uoguelph.ca/web/" className="copyright">&copy; {(new Date().getFullYear())} University of Guelph</a>
					</div>
					<div className="col-md-4 col-lg-3 col-sm-12">
						<ul className="footer-links nav navbar-nav navbar-right">
							<li><a href="//www.uoguelph.ca/accessibility/"><i className="far fa-universal-access" aria-hidden="true"></i> Accessibility</a></li>
							<li><a href="//www.uoguelph.ca/web/privacy/"><i className="fas fa-key" aria-hidden="true"></i> Privacy</a></li>
							<li><a href="//www.uoguelph.ca/sitemap/"><i className="far fa-sitemap" aria-hidden="true"></i> Site Map</a></li>
							<li><a href="//uoguelph.statuspage.io/"><i className="fas fa-shield-check" aria-hidden="true"></i> Status Page</a></li>
							<li><a href="//www.uoguelph.ca/studentexperience/aboriginal/territorial-acknowledgement" 
									data-toggle="tooltip"
									title="The University of Guelph resides on the treaty lands and territory of the Mississaugas of the Credit.  We recognize that today this gathering place is home to many First Nations, Inuit and Métis peoples and acknowledging them reminds us of our collective responsibility to the land where we learn and work.">
									<i className="fal fa-trees" aria-hidden="true"></i> Territorial Acknowledgement</a>
							</li>
						</ul>
					</div>
					<div className="col-md-4 col-lg-3 col-sm-12">
						<ul className="footer-links nav navbar-nav">
							<li><a href="https://www.uoguelph.ca/hr/careers-guelph/current-opportunities"><i className="far fa-briefcase"></i> Careers</a></li>
							<li><a href="https://www.uoguelph.ca/registrar/calendars/undergraduate/current/"><i className="far fa-calendar-alt"></i> Undergraduate Calendar</a></li>
							<li><a href="https://www.uoguelph.ca/registrar/calendars/graduate/current/"><i className="far fa-calendar-alt"></i> Graduate Calendar</a></li>
							<li><a href="https://admission.uoguelph.ca/programs"><i className="fas fa-list"></i> Program Plans</a></li>
							<li><a href="https://www.alumni.uoguelph.ca/give-to-guelph/how-to-give"><i className="fas fa-hand-holding-heart"></i> Give to U of G</a></li>
						</ul>
					</div>
					<div className="col-md-4 col-lg-3 col-sm-12">
						<address>
							<strong>University of Guelph</strong><br />
							50 Stone Road East,<br />
							Guelph, Ontario, Canada<br />
							N1G 2W1<br />
							<a href="tel:1-519-824-4120"><span className="fa fa-phone"></span> 519-824-4120</a>
						</address>
					</div>
				</div>
			</footer>
		</div>
	</div>)

}

export default Footer
