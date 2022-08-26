import React from 'react';
import { graphql } from 'gatsby';
import { Container } from "react-bootstrap"
import Statistic from 'components/shared/statistic'
import styled from "styled-components"

const Gradient = styled.div`
  background: linear-gradient(to right,#000 0%,#000 60%,#69A3B9 60%,#69A3B9 100%);
`
const gradientColourOptions = [
  {background: "var(--black)", colour: "#FFFFFF"},
  {background: "var(--uog-red)", colour: "#FFFFFF"},
  {background: "var(--uog-yellow)", colour: "#000000"},
  {background: "var(--uog-blue)", colour: "#000000"},
];

const GradientStatistic = ({stats, id}) => {
  return <Gradient className="d-flex flex-column">
    <Container className="page-container p-0">
        <Statistic className="row g-0 row-cols-1 row-cols-sm-2 row-cols-lg-4 justify-content-center mb-0">
            {stats.map((stat, index) => {
              let type = stat.field_statistic_represents;
              let value = stat.field_stat_value;
              let icon = stat.field_font_awesome_icon;

              return <Statistic.SolidCard 
                    key={`gradient-stat-${stat.drupal_id}`} 
                    background={gradientColourOptions[index].background} 
                    colour={gradientColourOptions[index].colour} 
                    className="p-5 col">
                    <Statistic.Value><strong>{value}</strong></Statistic.Value>
                    <Statistic.Type><span dangerouslySetInnerHTML={{__html: type.processed}} /></Statistic.Type>
                  </Statistic.SolidCard>
              }
            )}
        </Statistic>
    </Container>
  </Gradient>
}

const StatisticSelector = ({statistics, style}) => {
  console.log(statistics)
  switch (style) {
      case "Light Blue":
          return <h1>Light Blue</h1>;
      case "Left Border":
          return <h1>Left Border</h1>;
      case "Gradient of Solid Colours":
          return <GradientStatistic stats={statistics} />
      case "Solid Colours":
          return <h1>Solid Colours</h1>;
      default:
          return null;
  }
}

const StatisticWidget = (props) => {
  let statItems = props.statisticData?.relationships?.field_statistic;
  let statStyle = props.statisticData?.relationships?.field_statistic_style.name;

  return statItems ? 
    <StatisticSelector statistics={statItems} style={statStyle} /> 
    : null
}

export default StatisticWidget

export const query = graphql`
fragment StatisticWidgetParagraphFragment on paragraph__statistic_widget {
  drupal_id
  relationships {
    field_statistic {
      __typename
      ... on paragraph__statistic_item {
        drupal_id
        field_stat_value
        field_statistic_represents {
          processed
        }
        field_font_awesome_icon
        relationships {
          field_media_text_media {
            ... on media__image {
              name
              field_media_image {
                alt
              }
              relationships {
                field_media_image {
                  publicUrl
                  gatsbyImage(
                    layout: CONSTRAINED,
                    placeholder: BLURRED,
                    width: 600,
                  )
                }
              }
            }

          } 
        }
      }
    }
    field_statistic_style {
      name
    }
  }
}
`
