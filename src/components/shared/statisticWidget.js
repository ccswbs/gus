import React from 'react';
import { graphql } from 'gatsby';
import { GatsbyImage, getImage } from "gatsby-plugin-image";
import { Container } from "react-bootstrap";
import PageContainer from 'components/shared/pageContainer';
import Statistic from 'components/shared/statistic';
import styled from "styled-components";


const Gradient = styled.div`
  background: ${props => (props.gradientStyle ?? "none")};
  padding: 0;
`

const gradientColourOptions = [
  {background: "var(--black)", colour: "#FFFFFF"},
  {background: "var(--uog-red)", colour: "#FFFFFF"},
  {background: "var(--uog-yellow)", colour: "#000000"},
  {background: "var(--uog-blue)", colour: "#000000"},
  {background: "var(--uog-yellow)", colour: "#000000"},
  {background: "var(--black)", colour: "#FFFFFF"},
  {background: "var(--uog-blue)", colour: "#000000"},
  {background: "var(--uog-red)", colour: "#FFFFFF"},
];

const GradientStatistic = ({stats}) => {
  let numStats = stats.length;

  // default is displaying 3 colours in a row
  let rowClasses = "row-cols-md-3";
  let gradientStyle = "linear-gradient(to right,#000 0%,#000 60%,#ffc72a 60%,#ffc72a 100%)";

  if (numStats === 1){
    // one colour
    rowClasses = "row-cols-sm-1";
    gradientStyle = "#000000";
  } else if (numStats === 2) {
    // two colours
    rowClasses = "row-cols-sm-2";
    gradientStyle = "linear-gradient(to right,#000 0%,#000 60%,#c20430 60%,#c20430 100%)";
  } else if (numStats % 4 === 0) {
    // four colour
    rowClasses = "row-cols-sm-2 row-cols-lg-4";
    gradientStyle = "linear-gradient(to right,#000 0%,#000 60%,#69A3B9 60%,#69A3B9 100%)";
  }

  return (
    <Gradient className="d-flex flex-column mb-4" gradientStyle={gradientStyle}>
      <Container className="page-container p-0">
          <Statistic className={`row g-0 row-cols-1 ${rowClasses} justify-content-center mb-0`}>
              {stats.map((stat, index) => {
                let type = stat.field_statistic_represents;
                let value = stat.field_statistic_value;
                let icon = stat.field_font_awesome_icon;

                return <Statistic.SolidCard 
                      key={`gradient-stat-${stat.drupal_id}`} 
                      background={gradientColourOptions[index%gradientColourOptions.length].background} 
                      colour={gradientColourOptions[index%gradientColourOptions.length].colour} 
                      className="p-5 col">
                        {icon && <Statistic.Icon icon={icon} colour={gradientColourOptions[index%gradientColourOptions.length].colour} />}
                        <Statistic.Value><strong>{value}</strong></Statistic.Value>
                        <Statistic.Type><span dangerouslySetInnerHTML={{__html: type.processed}} /></Statistic.Type>
                    </Statistic.SolidCard>
                }
              )}
          </Statistic>
      </Container>
    </Gradient>
)}

const solidColourOptions = [
  {background: "var(--black)", colour: "#FFFFFF"},
  {background: "var(--uog-red)", colour: "#FFFFFF"},
  {background: "var(--uog-yellow)", colour: "#000000"},
];

const SolidColourStatistic = ({stats, numColumns}) => {
  return (
    <PageContainer.SiteContent>
      <Container>
        <Statistic.Grid columns={numColumns} className="gap-4">
          {stats.map((stat, index) => {
              let type = stat.field_statistic_represents;
              let value = stat.field_statistic_value;
              let icon = stat.field_font_awesome_icon;
              let image = {
                src: stat.relationships?.field_media_text_media?.relationships?.field_media_image,
                alt: stat.relationships?.field_media_text_media?.field_media_image?.alt,
              }

              return <Statistic.SolidCard  
                key={`solid-stat-${stat.drupal_id}`} 
                background={solidColourOptions[index%solidColourOptions.length].background} 
                colour={solidColourOptions[index%solidColourOptions.length].colour}
                className="pt-4 pb-0 px-0 h-100 card border-0" >
                  {icon && <Statistic.Icon icon={icon} colour={solidColourOptions[index%solidColourOptions.length].colour} />}
                  <Statistic.Value><strong>{value}</strong></Statistic.Value>
                  <Statistic.Type className="mb-4 px-5"><span dangerouslySetInnerHTML={{__html: type.processed}} /></Statistic.Type>
                  {image.src && <dd className="mb-0 h-100"><GatsbyImage image={getImage(image.src)} alt={image.alt} className="h-100 card-img-bottom" /></dd>}
              </Statistic.SolidCard>
            }
          )}
      </Statistic.Grid>
    </Container>
  </PageContainer.SiteContent>
)} 

const NoBorderStatistic = ({stats, numColumns}) => {
  return (
    <PageContainer.SiteContent>
      <Container>
        <Statistic.Grid columns={numColumns} className="gap-4">
          {stats.map((stat) => {
            let type = stat.field_statistic_represents;
            let value = stat.field_statistic_value;
            let icon = stat.field_font_awesome_icon;

            return <Statistic.Card key={`noborder-stat-${stat.drupal_id}`} className="px-5">
                  {icon && <Statistic.Icon icon={icon} />}
                  <Statistic.Value><strong>{value}</strong></Statistic.Value>
                  <Statistic.Type><span dangerouslySetInnerHTML={{__html: type.processed}} /></Statistic.Type>
              </Statistic.Card>
            }
          )}
        </Statistic.Grid>
      </Container>
    </PageContainer.SiteContent>
  )
} 

const borderColourOptions = [
  {border: "var(--black)"},
  {border: "var(--uog-red)"},
  {border: "var(--uog-yellow)"},
  {border: "var(--uog-blue)"},
  {border: "var(--black)"},
]

const LeftBorderStatistic = ({stats, numColumns}) => {
  return (
    <PageContainer.SiteContent>
      <Container>
        <Statistic.Grid columns={numColumns} className="gap-4">
          {stats.map((stat, index) => {
            let type = stat.field_statistic_represents;
            let value = stat.field_statistic_value;
            let icon = stat.field_font_awesome_icon;

            return <Statistic.BorderCard 
                key={`border-stat-${stat.drupal_id}`} 
                border={borderColourOptions[index%borderColourOptions.length].border} >
                  {icon && <Statistic.Icon icon={icon} />}
                  <Statistic.Value><strong>{value}</strong></Statistic.Value>
                  <Statistic.Type><span dangerouslySetInnerHTML={{__html: type.processed}} /></Statistic.Type>
              </Statistic.BorderCard>
            }
          )}
        </Statistic.Grid>
      </Container>
    </PageContainer.SiteContent>
)}

const StatisticSelector = ({statistics, style}) => {
  let numStats = statistics.length;
  let numColumns =  ((numStats === 2) || (numStats === 4)) ? 2 : 3;

  switch (style) {
      case "Light Blue":
          return <NoBorderStatistic stats={statistics} numColumns={numColumns} />
      case "Left Border":
          return <LeftBorderStatistic stats={statistics} numColumns={numColumns} />
      case "Gradient of Solid Colours":
          return <GradientStatistic stats={statistics} />
      case "Solid Colours":
          return <SolidColourStatistic stats={statistics} numColumns={numColumns} />
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
        field_statistic_value
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
