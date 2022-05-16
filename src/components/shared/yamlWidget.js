import React from 'react';
import { graphql } from 'gatsby';

// @todo - add index of components in components/blocks and import all in one line
// until then, import each component manually below
import InternationalStatsGlobal from 'components/blocks/international/international-stats-global'
import InternationalExploreThingsToKnow from 'components/blocks/international/international-things-to-know'
import InternationalExploreButtons from 'components/blocks/international/international-explore-btns'

const YamlWidget = (props) => {
    let component = props.blockData.relationships.field_custom_block?.field_yaml_id;

    // add new custom components to conditional rendering below
    return ({
        'international_stats_global_impact': <InternationalStatsGlobal />,
        'international_explore_things_to_know': <InternationalExploreThingsToKnow />,
        'international_explore_btns': <InternationalExploreButtons />,
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
                    localFile {
                      childImageSharp {
                        gatsbyImageData(width: 400, placeholder: BLURRED, layout: CONSTRAINED)
                      }
                    }
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