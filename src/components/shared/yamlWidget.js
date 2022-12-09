import React from 'react';
import { graphql } from 'gatsby';

const InternationalStatsGlobal = React.lazy(() => import('components/blocks/international/international-stats-global'));
const InternationalExploreThingsToKnow = React.lazy(() => import('components/blocks/international/international-things-to-know'));
const InternationalExploreButtons = React.lazy(() => import('components/blocks/international/international-explore-btns'));
const InternationalExploreGrid = React.lazy(() => import('components/blocks/international/international-explore-grid'));
const InternationalTalkCurrentStudent = React.lazy(() => import('components/blocks/international/international-talk-current-student'));
const InternationalExploreLead = React.lazy(() => import('components/blocks/international/international-explore-lead'));
const LangBcommStats = React.lazy(() => import('components/blocks/lang/lang-bcomm-stats'));
const LangBcommQuote = React.lazy(() => import('components/blocks/lang/lang-bcomm-quote'));
const LangBcommSupportiveCommunity = React.lazy(() => import('components/blocks/lang/lang-bcomm-supportive-community'));
const LangBcommStatsBordered = React.lazy(() => import('components/blocks/lang/lang-bcomm-stats-bordered'));
const LangBcommFeatureExperience = React.lazy(() => import('components/blocks/lang/lang-bcomm-feature-experience'));
const LangBcommStudentBlog = React.lazy(() => import('components/blocks/lang/lang-bcomm-student-blog'));

const YamlWidget = (props) => {
    let component = props.blockData.relationships.field_custom_block?.field_yaml_id;

    // add new custom components to conditional rendering below
    return ({
        'international_stats_global_impact': <InternationalStatsGlobal />,
        'international_explore_things_to_know': <InternationalExploreThingsToKnow />,
        'international_explore_btns': <InternationalExploreButtons />,
        'international_explore_grid': <InternationalExploreGrid />,
        'international_talk_current_student':<InternationalTalkCurrentStudent />,
        'international_talk_current_student_blue':<InternationalTalkCurrentStudent background="#F4F7FA" />,
        'international_explore_lead':<InternationalExploreLead />,
        'lang_bcomm_stats':<LangBcommStats />,
        'lang_bcomm_quote':<LangBcommQuote />,
        'lang_bcomm_supportive_community':<LangBcommSupportiveCommunity />,
        'lang_bcomm_stats_bordered':<LangBcommStatsBordered />,
        'lang_bcomm_feature_experience':<LangBcommFeatureExperience />,
        'lang_bcomm_student_blog':<LangBcommStudentBlog />,
        'lang_bcomm_student_blog_blue':<LangBcommStudentBlog background="#F4F7FA" />,

    }[component] || null )
}

export default YamlWidget

export const query = graphql`
  fragment YamlWidgetParagraphFragment on paragraph__yaml_widget {
    drupal_id
    relationships {
      field_custom_block {
        info
        field_yaml_id
        field_yaml_map
        relationships {
          field_yaml_files{
            id
            name
            relationships {
              field_media_image {
                gatsbyImage(width: 400, placeholder: BLURRED, layout: CONSTRAINED)
              }
            }
            path {
              alias
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