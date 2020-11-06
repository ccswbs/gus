import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'gatsby';
import { contentExists } from '../utils/ug-utils';
//import '../styles/breadcrumbs.css';
import menuData from '../../config/sitemaps/place-to-grow.yml';


function test(currentPage) {
	
	let crumb1;
	let crumb1id;
	let crumb1url;
	let crumb2;
	let crumb2id;
	let crumb2url;
	let crumb3;
	
	for (let i=0; i<menuData.length; i++) {
		
		crumb1 = menuData[i].title;
		crumb1id = menuData[i].drupal_id;
		crumb1url = menuData[i].alias;
		
		if (contentExists(menuData[i].children)) {
			for (let j=0; j<menuData[i].children.length; j++) {
				crumb2 = menuData[i].children[j].title;
				crumb2id = menuData[i].children[j].drupal_id;
				crumb2url = menuData[i].children[j].alias;
				if (contentExists(menuData[i].children[j].children)) {
					for (let k=0; j<menuData[i].children[j].children.length; k++) {
						crumb3 = menuData[i].children[j].children[k].title;
					}
				}
			}
		}
	}
	return (
		<>{crumb1id === currentPage ? <li className="breadcrumb-item">{crumb1}</li> 
		: <><li className="breadcrumb-item"><Link to={crumb1url}>{crumb1}</Link></li>
		<li className="breadcrumb-item">{crumb2id === currentPage ? crumb2 : currentPage}</li> </>
		}</>
	)
}


function Breadcrumbs (props) {

	const currentPage = String(props.nodeID);

//console.log(menuData[0].title, menuData[0].children[0].title);	
	
	if (contentExists(currentPage)) {		
		return (<>
			<div className="breadcrumbs loaded">
				<div className="container">
					<div className="row">
						<div className="col-sm-12">
							<div className="site-breadcrumbs">			
							<ol className="breadcrumb breadcrumb-right-tag">
								<li className="breadcrumb-item">
									<Link to="/"><i className='fa fa-home'><span className='sr-only'>Home</span></i></Link>
								</li>
								{test(currentPage)}								
							</ol>
							</div>
						</div>
					</div>
				</div>
			</div>
		</>)	
	}
	return null;

}

Breadcrumbs.propTypes = {
	nodeID: PropTypes.number,
}

Breadcrumbs.defaultProps = {
    nodeID: null,
	nodeTitle: ``,
}

export default Breadcrumbs