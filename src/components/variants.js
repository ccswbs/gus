import React from "react"
import PropTypes from "prop-types"

function Variants ( { progvarData } ) {
		return (
			<React.Fragment>
				{progvarData.length > 0 && (
					<ul>
						{progvarData.map((edge) => {
							let variantElement = (edge.field_variant_link !== null) ? <a href={edge.field_variant_link.uri}>{edge.field_variant_title}</a> : edge.field_variant_title;
							return <li key={edge.drupal_id}>{variantElement}</li>
						})}
					</ul>
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