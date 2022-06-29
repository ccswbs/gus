import React from 'react';
import { graphql } from 'gatsby';

// @todo - add index of components in components/blocks and import all in one line
// until then, import each component manually below
import YamlBlockExample from 'components/blocks/yaml-block-example';
import InternationalStatsGlobal from 'components/blocks/international/international-stats-global'
import InternationalExploreThingsToKnow from 'components/blocks/international/international-things-to-know'
import InternationalExploreButtons from 'components/blocks/international/international-explore-btns'
import InternationalExploreGrid from 'components/blocks/international/international-explore-grid'
import InternationalTalkCurrentStudent from 'components/blocks/international/international-talk-current-student'
import InternationalExploreLead from 'components/blocks/international/international-explore-lead'
import LangBcommStats from 'components/blocks/lang/lang-bcomm-stats'
import LangBcommFutureCards from 'components/blocks/lang/lang-bcomm-future-cards';
import LangBcommQuote from 'components/blocks/lang/lang-bcomm-quote';
import LangBcommSupportiveCommunity from 'components/blocks/lang/lang-bcomm-supportive-community';
import LangBcommStatsBordered from 'components/blocks/lang/lang-bcomm-stats-bordered';
import LangBcommFeatureExperience from 'components/blocks/lang/lang-bcomm-feature-experience';
import LangBcommFutureCardsAdvantage from 'components/blocks/lang/lang-bcomm-future-cards-advantage';

const YamlWidget = (props) => {
    let component = props.blockData.relationships.field_custom_block?.field_yaml_id;

    // add new custom components to conditional rendering below
    return ({
        'yaml_block_example': <YamlBlockExample />,
        'international_stats_global_impact': <InternationalStatsGlobal />,
        'international_explore_things_to_know': <InternationalExploreThingsToKnow />,
        'international_explore_btns': <InternationalExploreButtons />,
        'international_explore_grid': <InternationalExploreGrid />,
        'international_talk_current_student':<InternationalTalkCurrentStudent />,
        'international_talk_current_student_blue':<InternationalTalkCurrentStudent background="#F4F7FA" />,
        'international_explore_lead':<InternationalExploreLead />,
        'lang_bcomm_stats':<LangBcommStats />,
        'lang_bcomm_future_cards':<LangBcommFutureCards />,
        'lang_bcomm_quote':<LangBcommQuote />,
        'lang_bcomm_supportive_community':<LangBcommSupportiveCommunity />,
        'lang_bcomm_stats_bordered':<LangBcommStatsBordered />,
        'lang_bcomm_feature_experience':<LangBcommFeatureExperience />,
        'lang_bcomm_future_cards_advantage':<LangBcommFutureCardsAdvantage />

    }[component] || null )
}

export default YamlWidget

export const query = graphql`
  fragment YamlMediaImageFragment on media__image {
    id
    name
    field_media_image {
      alt
    }
    relationships {
      field_media_image {
        localFile {
          publicURL
          childImageSharp {
            gatsbyImageData(width: 1000, placeholder: BLURRED, layout: CONSTRAINED)
          }
        }
      }
    }
    path {
      alias
    }
  }
  fragment YamlMediaFileFragment on media__file {
    id
    drupal_id
    name
    relationships {
      field_media_file {
        localFile {
          publicURL
        }
      }
    }
    path {
      alias
    }
  }
  fragment YamlMediaRemoteVideoFragment on media__remote_video {
    id
    drupal_id
    name
    field_media_oembed_video
    field_video_height
    field_video_width
    relationships {
      field_media_file {
        localFile {
          publicURL
        }
      }
      field_video_cc {
        localFile {
          publicURL
        }
      }
    }
    path {
      alias
    }
  }
  
  fragment YamlWidgetParagraphFragment on paragraph__yaml_widget {
    drupal_id
    relationships {
      field_custom_block {
        info
        field_yaml_id
        field_yaml_map
        relationships {
          field_yaml_files{
            __typename
            ... on media__image {
              ...YamlMediaImageFragment
            }
            ... on media__file {
              ...YamlMediaFileFragment
            }
            ... on media__remote_video {
              ...YamlMediaRemoteVideoFragment
            }
          }
        }
      }
      field_section_column {
        name
      }
    }
  }
`