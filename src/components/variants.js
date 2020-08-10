import React from 'react';
import PropTypes from 'prop-types';

function Variants ( { progvarData } ) {

		var displayElements = [];
		var displayProgVariants;
		var trackPreviousElement;

		progvarData.map((edge) => {
			if(trackPreviousElement !== "paragraph__program_variants"){
				displayProgVariants = [];
			}
			// display program variants as lists
			if(edge.__typename === "paragraph__program_variants"){
				let variantElement = (edge.field_variant_link !== null) ? <a href={edge.field_variant_link.uri}>{edge.field_variant_title}</a> : edge.field_variant_title;
				displayProgVariants.push(<li key={edge.drupal_id}>{variantElement}</li>);

			// display other paragraph elements as HTML
			}else{
				if(trackPreviousElement === "paragraph__program_variants"){
					displayElements.push(<ul>{displayProgVariants}</ul>);
				}
				displayElements.push(<div dangerouslySetInnerHTML={{__html: edge.field_general_text.value}}/>);
			}
			trackPreviousElement = edge.__typename;
		});

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
    progvarData: PropTypes.array,
}
Variants.defaultProps = {
    progvarData: null,
}
  
export default Variants