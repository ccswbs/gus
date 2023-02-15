import React from 'react';
import { graphql } from 'gatsby';
import { GatsbyImage, getImage } from "gatsby-plugin-image";
import { Container } from "react-bootstrap";
import PageContainer from 'components/shared/pageContainer';
import Statistic from 'components/shared/statistic';
import classNames from "classnames"
import "styles/stats.css"

const StatisticGradient = ({stats}) => {
  let numStats = stats.length;

  // default is displaying 3 colours in a row
  let rowClasses = classNames("row-cols-md-3");
  let bgClass = classNames("bg-colors-3");

  if (numStats === 1) {
    // one colour
    rowClasses = classNames("row-cols-sm-1");
    bgClass = classNames("bg-black");
  } else if (numStats === 2) {
    // two colours
    rowClasses = classNames("row-cols-sm-2");
    bgClass = classNames("bg-colors-2");
  } else if (numStats % 4 === 0) {
    // four colour
    rowClasses = classNames("row-cols-sm-2 row-cols-lg-4");
    bgClass = classNames("bg-colors-4");
  }
  
  let statClasses = classNames("gradient-stats","g-0","justify-content-center","mb-0","row","row-cols-1",rowClasses);
  let gradientClasses = classNames("d-flex","flex-column","mb-4","p-0",bgClass);

  return (
    <div data-title="Gradient Statistic" className={gradientClasses}>
      <Container className="page-container p-0">
          <Statistic classes={statClasses}>
              {stats.map((stat, index) => {
                let type = stat.field_statistic_represents;
                let value = stat.field_statistic_value;
                let icon = stat.field_font_awesome_icon;

                return <Statistic.SolidCard key={`gradient-stat-${stat.drupal_id}`} classes="stat-solid-card p-5 col">
                        {icon && <Statistic.Icon icon={icon} />}
                        <Statistic.Value classes="text-center"><strong>{value}</strong></Statistic.Value>
                        <Statistic.Type classes="text-center"><span dangerouslySetInnerHTML={{__html: type.processed}} /></Statistic.Type>
                    </Statistic.SolidCard>
                }
              )}
          </Statistic>
      </Container>
    </div>
)}

const StatisticRegular = ({stats, numColumns, cardStyle}) => {

  let cardClasses;
  let colClasses;
  let statClasses;
  let typeClasses;
  let valueClasses;
  
  if (numColumns === 2 || numColumns >= 4) {
    colClasses = "stat-grid-2"; 
  } else {
    colClasses = "stat-grid-3";
  }
  
  if (cardStyle === "border") {
    statClasses = "stat-border";
    cardClasses = classNames("stat-border-card","default-card-bg");
  } else if (cardStyle === "ugColors") {
    statClasses = "solid-stats";
    cardClasses = "stat-solid-card";    
    valueClasses = "text-center";
    typeClasses = "mb-4 px-5 text-center";
  } else {
    statClasses = "solid-stats";
    cardClasses = "default-card-bg";
    valueClasses = "text-center";
    typeClasses = "text-center";
  }
  
  return (
    <PageContainer.SiteContent>
      <Container>
        <Statistic classes={classNames("gap-4",colClasses,statClasses)}>
          {stats.map((stat, index) => {
            let type = stat.field_statistic_represents;
            let value = stat.field_statistic_value;
            let icon = stat.field_font_awesome_icon;
            let image = {
              src: stat.relationships?.field_media_text_media?.relationships?.field_media_image,
              alt: stat.relationships?.field_media_text_media?.field_media_image?.alt,
            }
            return <Statistic.Card key={`${cardClasses}-${stat.drupal_id}`} classes={classNames("pt-4",cardClasses)}>
                  {icon && <Statistic.Icon icon={icon} />}
                  <Statistic.Value classes={classNames(valueClasses)}><strong>{value}</strong></Statistic.Value>
                  <Statistic.Type classes={classNames(typeClasses)}><span dangerouslySetInnerHTML={{__html: type.processed}} /></Statistic.Type>
                  {image.src && <dd className="mb-0 h-100"><GatsbyImage image={getImage(image.src)} alt={image.alt} className="card-img" /></dd>}
              </Statistic.Card>
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
          return <StatisticRegular stats={statistics} numColumns={numColumns} cardStyle="default" />
      case "Left Border":
          return <StatisticRegular stats={statistics} numColumns={numColumns} cardStyle="border" />
      case "Gradient of Solid Colours":
          return <StatisticGradient stats={statistics} />
      case "Solid Colours":
          return <StatisticRegular stats={statistics} numColumns={numColumns} cardStyle="ugColors" />
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
