import React from 'react';
import { graphql } from 'gatsby';
import StoryImageCutout from 'components/shared/StoryImageCutout';

const StorySelector = ({story}) => {
    switch (story?.__typename) {
        case "paragraph__story_image_cutout_background":
            return <StoryImageCutout storyData={story} />;
        default:
            return <></>
    }
}

const Story = ({props}) => {
    return <StorySelector story={props.storyData} />
}

export default Story

export const query = graphql`
  fragment StoryWidgetParagraphFragment on paragraph__story_widget {
    drupal_id
    relationships {
      field_story_content {
        __typename
        ... on paragraph__story_image_cutout_background {
          ...StoryImageCutoutParagraphFragment
        }
      }
    }
  }
`
