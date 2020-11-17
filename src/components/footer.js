import React from 'react';
import { contentExists, fetchMenu } from '../utils/ug-utils';

function getSocialMenu() {
	const socialMenu = fetchMenu('ug-social-media');
	
	if (contentExists(socialMenu)) {
		
		return <>
		<ul id="socialicons" className="nav navbar-nav navbar-left col-md-4 col-sm-12">
			{socialMenu.map(item => { 
				let socialSite = item.title;
				let itemLabel = socialSite.toLowerCase();
				if (item.title === "Social Media Directory") {
					return <><li key={item.id} className="smdirectory"><a href={item.url}>{item.title}</a></li></>
				} else {
					return <><li key={item.id}>
					<a aria-label={itemLabel} href={item.url}>
					<i className={"fab fa-" + itemLabel} aria-hidden="true"></i>
					<span className="sr-only">{socialSite}</span></a>
					</li></>
				}
			})}
		</ul>
		</>
	}
	return null;
}

function Footer() {
	
	return (<div className="footer-wrapper">
		<div className="container">
			<footer className="navbar navbar-default">
				<div className="row">
					<div className="col-md-4 col-lg-3 col-sm-12">
						<a href="https://uoguelph.ca/improve-life" className="il-link">
							<img src="https://www.uoguelph.ca/img/improve-life.svg" alt="Improve Life" className="footer-tagline" />
						</a>
						{getSocialMenu()}						
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
