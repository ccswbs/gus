import React from 'react';
import PropTypes from 'prop-types';

function Variants ( { variantData } ) {
	var displayElements = [];
	var displayProgVariants;
	var trackPreviousElement;
	
	for (let i=0; i<variantData.length; i++) {
		if (trackPreviousElement !== "paragraph__program_variants") {
			displayProgVariants = [];
		}
		// display program variants as lists
		if (variantData[i].__typename === "paragraph__program_variants") {
			let variantElement = (variantData[i].field_variant_link !== null) ? <a href={variantData[i].field_variant_link.uri}>{variantData[i].field_variant_title}</a> : variantData[i].field_variant_title;
			displayProgVariants.push(<li key={variantData[i].drupal_id}>{variantElement}</li>);

			// add nested list if last display element is a program variant
			if (i === (variantData.length - 1)) {
				displayElements.push(<ul className="two-col-md" key={'ul-before-' + variantData[i].drupal_id}>{displayProgVariants}</ul>);
			}

		// display other paragraph elements as HTML
		} else {
			// add nested list if next display element is not a program variant
			if (trackPreviousElement === "paragraph__program_variants") {
				displayElements.push(<ul className="two-col-md" key={'ul-before-' + variantData[i].drupal_id}>{displayProgVariants}</ul>);
			}
			displayElements.push(<div key={variantData[i].drupal_id} dangerouslySetInnerHTML={{__html: variantData[i].field_general_text.processed}}/>);
		}
		trackPreviousElement = variantData[i].__typename;
	};

	return (
		<React.Fragment>
			{displayElements.length > 0 && (
				<div>
					{displayElements.map((element) => {
						return element;
					})}
				</div>
			)}
		</React.Fragment>
	)
}

Variants.propTypes = {
    variantData: PropTypes.array,
}
Variants.defaultProps = {
    variantData: null,
}
  
export default Variants