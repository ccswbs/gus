import React from 'react';
import { graphql } from 'gatsby';

// @todo - add index of components in components/blocks and import all in one line
// until then, import each component manually below
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