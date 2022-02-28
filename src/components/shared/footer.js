import React from 'react';
import { contentExists, fetchMenu } from 'utils/ug-utils';

function getSocialMenu(menuName) {
	const socialMenu = fetchMenu(menuName);
	
	if (contentExists(socialMenu)) {		
		return <React.Fragment key={menuName}>
		<ul id="socialicons" className="nav navbar-nav navbar-left col-md-4 col-sm-12">
			{socialMenu.map(item => { 
				let socialSite = item.title;
				let itemLabel = socialSite.toLowerCase();
				if (item.title === "Social Media Directory") {
					return <React.Fragment key={item.id}><li className="smdirectory"><a href={item.url}>{item.title}</a></li></React.Fragment>
				} else {
					return (<React.Fragment key={item.id}>
					<li>
					<a aria-label={itemLabel} href={item.url}>
					<i className={"fab fa-" + itemLabel} aria-hidden="true"></i>
					<span className="sr-only">{socialSite}</span></a>
					</li>
					</React.Fragment>)
				}
			})}
		</ul>
		</React.Fragment>
	}
	return null;
}

function fetchFooterMenu(menuName) {
	const footerMenu = fetchMenu(menuName);
	
	if (contentExists(footerMenu)) {		
		return <React.Fragment key={menuName}>
		<ul className="footer-links nav navbar-nav">
			{footerMenu.map(item => {
				if (item.title === "Territorial Acknowledgement") {
					return (<React.Fragment key={item.id}>
					<li>
						<a href={item.url} data-toggle="tooltip" title="The University of Guelph resides on the treaty lands and territory of the Mississaugas of the Credit.  We recognize that today this gathering place is home to many First Nations, Inuit and Métis peoples and acknowledging them reminds us of our collective responsibility to the land where we learn and work.">
						<i className={item.description} aria-hidden="true"></i>
						{item.title}</a>
					</li>
					</React.Fragment>)
				} else {
					return (<React.Fragment key={item.id}>
					<li><a href={item.url}><i className={item.description} aria-hidden="true"></i>{item.title}</a></li>
					</React.Fragment>)
				}
			})}
		</ul>
		</React.Fragment>
	}
	return null;
}

function Footer() {
	
	return (<div className="footer-wrapper">
		<div className="container">
			<footer className="navbar navbar-default">
				<div className="row">
					<div className="col-md-3 col-sm-12">
						<a href="https://uoguelph.ca/improve-life" className="il-link">
							<img src="https://www.uoguelph.ca/img/improve-life.svg" alt="Improve Life" className="footer-tagline" />
						</a>
						{getSocialMenu("ug-social-media")}					
						<a href="//www.uoguelph.ca/web/" className="copyright">&copy; {(new Date().getFullYear())} University of Guelph</a>
					</div>
					<div className="col-md-6 col-sm-12">
						{fetchFooterMenu("ug-footer-1")}
					</div>
					<div className="col-md-3 col-sm-12">
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
