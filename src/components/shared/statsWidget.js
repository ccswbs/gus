import React from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'gatsby';
import Stats from 'components/shared/stats'

function StatsWidget (props) {
	
	let statsData = props.statsWidgetData.relationships.field_statistic;

	return (<>
		<dl className="card-group stats">
			<Stats statsData={statsData} />
		</dl>
	</>)
}
		
StatsWidget.propTypes = {
	statsWidgetData: PropTypes.object,
}
StatsWidget.defaultProps = {
	statsWidgetData: null,
}
export default StatsWidget

export const query = graphql`
fragment StatsWidgetParagraphFragment on paragraph__stats_widget {
    drupal_id
    relationships {
      field_section_column {
        name
      }
      field_statistic {
        field_stat_range
        field_stat_value
        field_stat_value_end
        field_font_awesome_icon
        relationships {
          field_stat_type {
            name
          }
        }
      }
    }
  }
`