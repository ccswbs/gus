import React from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'gatsby';

function StatsWidget (props) {
	let statsData = props.data.relationships.field_statistic;

  if(statsData && statsData.length !== 0){
    return (
      <dl className="card-group stats">
        {statsData.map (stat => {	
          let statRange = stat.field_stat_range;
          let statType = stat.relationships.field_stat_type.name;
          let statValue = stat.field_stat_value;
          let statValueEnd = stat.field_stat_value_end;
          let statFAIcon = stat.field_font_awesome_icon;
  
          return <div key={`stat--${statType}`} className="uog-card text-break">
              <dt>
                {statFAIcon && <span className="fa-icon-colour"><i className={statFAIcon}>  </i></span>}
                {statRange === true && statValueEnd !== null ? statValue + " - " + statValueEnd : statValue}
              </dt>
              <dd>{statType}</dd>
            </div>
        })}
      </dl>
    )
  }
}
		
StatsWidget.propTypes = {
	data: PropTypes.object,
}
StatsWidget.defaultProps = {
	data: null,
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