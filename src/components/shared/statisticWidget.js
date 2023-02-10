import React from 'react';
import { graphql } from 'gatsby';
import { GatsbyImage, getImage } from "gatsby-plugin-image";
import { Container } from "react-bootstrap";
import PageContainer from 'components/shared/pageContainer';
import Statistic from 'components/shared/statistic';
import classNames from "classnames"
import "styles/stats.css"

const GradientStatistic = ({stats}) => {
  let numStats = stats.length;
  
  let rowClasses;
  let colClasses;

  
  if (numStats === 2) {
    rowClasses = "gradient-stats-2";
    colClasses = "d-flex flex-column";

  } else if (numStats === 3) {
      rowClasses = "gradient-stats-3";
      colClasses = "d-flex flex-column";

  } else if (numStats >= 4) {
      rowClasses = "gradient-stats-4";
      colClasses = "d-flex flex-column";

  } 

  return (
    <Statistic classes={classNames("gradient-stats",rowClasses)}>
      {stats.map((stat, index) => {
        let type = stat.field_statistic_represents;
        let value = stat.field_statistic_value;
        let icon = stat.field_font_awesome_icon;

        return <Statistic.SolidCard key={`gradient-stat-${stat.drupal_id}`} classes={classNames("stat-solid-card","p-5",colClasses)}>
                {icon && <Statistic.Icon icon={icon} />}
                <Statistic.Value classes={classNames("text-center")}><strong>{value}</strong></Statistic.Value>
                <Statistic.Type classes={classNames("text-center")}><span dangerouslySetInnerHTML={{__html: type.processed}} /></Statistic.Type>
            </Statistic.SolidCard>
        }
      )}
    </Statistic>
)}

const SolidColourStatistic = ({stats, numColumns}) => {

  let colClasses;
  
  if (numColumns === 2 || numColumns >= 4) {
    colClasses = "stats-grid-2"; 
  } else {
    colClasses = "stats-grid-3";
  }
  
  return (
    <PageContainer.SiteContent>
      <Container>
        <Statistic.Grid classes={classNames("solid-stats","stats-grid","gap-4",colClasses)}>
          {stats.map((stat, index) => {
              let type = stat.field_statistic_represents;
              let value = stat.field_statistic_value;
              let icon = stat.field_font_awesome_icon;
              let image = {
                src: stat.relationships?.field_media_text_media?.relationships?.field_media_image,
                alt: stat.relationships?.field_media_text_media?.field_media_image?.alt,
              }
              return (
                <Statistic.SolidCard key={`solid-stat-${stat.drupal_id}`} classes={classNames("stat-solid-card","pt-4")}>
                    {icon && <Statistic.Icon icon={icon} />}
                    <Statistic.Value classes="text-center"><strong>{value}</strong></Statistic.Value>
                    <Statistic.Type classes="mb-4 px-5 text-center"><span dangerouslySetInnerHTML={{__html: type.processed}} /></Statistic.Type>
                    {image.src && <dd className="mb-0 h-100"><GatsbyImage image={getImage(image.src)} alt={image.alt} className="card-img" /></dd>}
                </Statistic.SolidCard>
              )
            }
          )}
      </Statistic.Grid>
    </Container>
  </PageContainer.SiteContent>
)} 

const NoBorderStatistic = ({stats, numColumns}) => {
  let colClasses;
  
  if (numColumns === 2 || numColumns >= 4) {
    colClasses = "stats-grid-2"; 
  } else {
    colClasses = "stats-grid-3";
  }
  
  return (
    <PageContainer.SiteContent>
      <Container>
        <Statistic classes={classNames("stats-grid","gap-4",colClasses)}>
          {stats.map((stat) => {
            let type = stat.field_statistic_represents;
            let value = stat.field_statistic_value;
            let icon = stat.field_font_awesome_icon;

            return <Statistic.Card key={`noborder-stat-${stat.drupal_id}`} classes={classNames("default-card-bg","p-5")}>
                    {icon && <Statistic.Icon icon={icon} />}
                    <Statistic.Value classes="text-center"><strong>{value}</strong></Statistic.Value>
                    <Statistic.Type classes="text-center"><span dangerouslySetInnerHTML={{__html: type.processed}} /></Statistic.Type>
              </Statistic.Card>
            }
          )}
        </Statistic>
      </Container>
    </PageContainer.SiteContent>
  )
} 

const LeftBorderStatistic = ({stats, numColumns}) => {
  let colClasses;
  
  if (numColumns === 2 || numColumns >= 4) {
    colClasses = "stats-grid-2"; 
  } else {
    colClasses = "stats-grid-3";
  }
  
  return (
    <PageContainer.SiteContent>
      <Container>
        <Statistic columns={numColumns} classes={classNames("stats-border","gap-4",colClasses)}>
          {stats.map((stat, index) => {
            let type = stat.field_statistic_represents;
            let value = stat.field_statistic_value;
            let icon = stat.field_font_awesome_icon;

            return <Statistic.BorderCard key={`border-stat-${stat.drupal_id}`} classes={classNames("stat-border-card","default-card-bg","p-5")}>
                  {icon && <Statistic.Icon icon={icon} />}
                  <Statistic.Value><strong>{value}</strong></Statistic.Value>
                  <Statistic.Type><span dangerouslySetInnerHTML={{__html: type.processed}} /></Statistic.Type>
              </Statistic.BorderCard>
            }
          )}
        </Statistic>
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
