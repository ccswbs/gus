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
    <div className="mt-4">
        <h3 className="fs-3 mt-0 text-dark text-uppercase">{yamlMap.title}</h3>
        <div className="uog-border-blue px-4 mb-5">
            <div dangerouslySetInnerHTML={{__html: yamlMap.body_html}}></div>
            {yamlMap.video && 
              <ModalVideo 
                id={yamlMap.video.id} 
                src={yamlMap.video.url} 
                title={yamlMap.video.title} 
                transcript={yamlMap.video.transcript} 
                modalButton = {
                    <button type="button" className="btn btn-outline-info my-4">
                        <i className="fa-solid fa-play"></i> Watch Video<span className="visually-hidden">: {yamlMap.video.title}</span>
                    </button>
                }
            />}
        </div>
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