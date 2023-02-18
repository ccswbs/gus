import React from "react"
import { StaticQuery, graphql } from "gatsby"
import ModalVideo from "components/shared/modalVideo"

const yaml = require('js-yaml');

const render = ({ field_yaml_map }) => {
  let yamlMap;

  try {
    yamlMap = yaml.load(field_yaml_map);
  } catch (e) {
    console.log(e);
    return null;
  } 
  
  return (<>
    <h3 className="mt-0 text-dark text-uppercase">{field_yaml_map.title}</h3>
    <div className="border-5 border-start px-4 mb-5">
        <div dangerouslySetInnerHTML={{__html: field_yaml_map.body_html}}></div>
        {field_yaml_map.video && 
          <ModalVideo 
            id={field_yaml_map.video.id} 
            src={field_yaml_map.video.url} 
            title={field_yaml_map.video.title} 
            transcript={field_yaml_map.video.transcript} 
            modalButton = {
                <button type="button" className="btn btn-outline-info my-4">
                    <i className="fa-solid fa-play"></i> Watch Video<span className="visually-hidden">: {field_yaml_map.video.title}</span>
                </button>
            }
        />}
    </div>
  </>)
}
const query = graphql`
  query {
    blockContentYamlBlock(field_yaml_id: {glob: "economic_impact_provincial_onehealth"}) {
      id
      field_yaml_id
      field_yaml_map
    }
  }
`

export default function EconImpactProvincialImpactOnehealth () {
  return <StaticQuery query={query} render={({blockContentYamlBlock}) => render(blockContentYamlBlock)} />
}