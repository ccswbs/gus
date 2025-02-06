import React, { lazy, Suspense } from "react";
import { graphql } from 'gatsby';

const yamlModules = {
  'economic_impact_national_story': { moduleName: 'econImpactNationalStory', path: 'economic-impact' },
  'economic_impact_provincial_onehealth': { moduleName: 'econImpactProvincialImpactOnehealth', path: 'economic-impact'},
  'international_explore_grid': { moduleName: 'internationalExploreGrid', path: 'international'},
  'international_talk_current_student': { moduleName: 'internationalTalkCurrentStudent', path: 'international'},
  'lang_bcomm_supportive_community': { moduleName: 'langBcommSupportiveCommunity', path: 'lang'},
  'lang_bcomm_student_blog': { moduleName: 'langBcommStudentBlog', path: 'lang'},
  'lang_bcomm_student_blog_blue': { moduleName: 'langBcommStudentBlog', path: 'lang', background: '#F4F7FA'},
  'south_asia_explore_grid': { moduleName: 'southAsiaExploreGrid', path: 'canada'},
}

function renderYamlWidget(componentName, path, key, background) {
  const YamlComponent = lazy(() => import(`components/custom/${path}/${componentName}`));

  return (
    <Suspense key={`suspend-${key}`} fallback={<></>}>
      <YamlComponent key={key} background={background} />
    </Suspense>
  );
}

const YamlWidget = (props) => {
    let component = props.data.relationships.field_custom_block?.field_yaml_id;

    if (yamlModules[component]) {
      let key = props.data.drupal_id;
      let componentName = yamlModules[component].moduleName;
      let path = yamlModules[component].path;
      let background = yamlModules[component].background;
      return renderYamlWidget(componentName, path, key, background);
    }

    return <></>;
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
                gatsbyImage(width: 400, placeholder: BLURRED, layout: CONSTRAINED, formats: [AUTO, WEBP])
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