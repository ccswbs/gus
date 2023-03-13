import React from 'react';
import { graphql } from 'gatsby';

// @todo - add index of components in components/blocks and import all in one line
// until then, import each component manually below
const EconImpactNationalStory = React.lazy(() => import('components/blocks/economic-impact/national-impact-story'));
const EconImpactProvincialImpactOnehealth = React.lazy(() => import('components/blocks/economic-impact/provincial-impact-onehealth'));
const InternationalStatsGlobal = React.lazy(() => import('components/blocks/international/international-stats-global'));
const InternationalExploreThingsToKnow = React.lazy(() => import('components/blocks/international/international-things-to-know'));
const InternationalExploreButtons = React.lazy(() => import('components/blocks/international/international-explore-btns'));
const InternationalExploreGrid = React.lazy(() => import('components/blocks/international/international-explore-grid'));
const InternationalTalkCurrentStudent = React.lazy(() => import('components/blocks/international/international-talk-current-student'));
const InternationalExploreLead = React.lazy(() => import('components/blocks/international/international-explore-lead'));
const LangBcommQuote = React.lazy(() => import('components/blocks/lang/lang-bcomm-quote'));
const LangBcommSupportiveCommunity = React.lazy(() => import('components/blocks/lang/lang-bcomm-supportive-community'));
const LangBcommFeatureExperience = React.lazy(() => import('components/blocks/lang/lang-bcomm-feature-experience'));
const LangBcommStudentBlog = React.lazy(() => import('components/blocks/lang/lang-bcomm-student-blog'));
const SouthAsiaExploreGrid = React.lazy(() => import('components/blocks/canada/south-asia-explore-grid'));

const YamlWidget = (props) => {
    let component = props.blockData.relationships.field_custom_block?.field_yaml_id;

    // add new custom components to conditional rendering below
    return ({
        'economic_impact_national_story': <EconImpactNationalStory />,
        'economic_impact_provincial_onehealth': <EconImpactProvincialImpactOnehealth />,
        'international_stats_global_impact': <InternationalStatsGlobal />,
        'international_explore_things_to_know': <InternationalExploreThingsToKnow />,
        'international_explore_btns': <InternationalExploreButtons />,
        'international_explore_grid': <InternationalExploreGrid />,
        'international_talk_current_student':<InternationalTalkCurrentStudent />,
        'international_talk_current_student_blue':<InternationalTalkCurrentStudent background="#F4F7FA" />,
        'international_explore_lead':<InternationalExploreLead />,
        'lang_bcomm_quote':<LangBcommQuote />,
        'lang_bcomm_supportive_community':<LangBcommSupportiveCommunity />,
        'lang_bcomm_feature_experience':<LangBcommFeatureExperience />,
        'lang_bcomm_student_blog':<LangBcommStudentBlog />,
        'lang_bcomm_student_blog_blue':<LangBcommStudentBlog background="#F4F7FA" />,
        'south_asia_explore_grid': <SouthAsiaExploreGrid />,

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