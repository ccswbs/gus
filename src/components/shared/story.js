import React from 'react';
import { graphql } from 'gatsby';
import StatisticWidget from 'components/shared/statisticWidget';
import StoryImageCutout from 'components/shared/storyImageCutout';

const StorySelector = ({story}) => {
    switch (story?.__typename) {
        case "paragraph__statistic_widget":
            return <StatisticWidget statisticData={story} />;
        case "paragraph__story_image_cutout_background":
            return <StoryImageCutout storyData={story} />;
        default:
            return null;
    }
}

const Story = (props) => {
    let storyContent = props.storyData?.relationships.field_story_content;
    return storyContent ? 
      <>
        {storyContent?.map((story, index) => <StorySelector story={story} key={index} />)} 
      </> : null
}

export default Story

export const query = graphql`
  fragment StoryWidgetParagraphFragment on paragraph__story_widget {
    drupal_id
    relationships {
      field_story_content {
        __typename
        ... on paragraph__statistic_widget {
          ...StatisticWidgetParagraphFragment
        }
        ... on paragraph__story_image_cutout_background {
          ...StoryImageCutoutParagraphFragment
        }
      }
    }
  }
`
