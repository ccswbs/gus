import React from 'react';
import data from "../../../data/custom/economic-impact/provincial_onehealth.yml"
import ModalVideo from "components/shared/modalVideo"

const EconImpactProvincialImpactOnehealth = () => {
   return (
      <div className="mt-4">
          <h3 className="fs-3 mt-0 text-dark text-uppercase">{data.title}</h3>
          <div className="uog-border-blue px-4 mb-5">
              <div dangerouslySetInnerHTML={{__html: data.body_html}}></div>
              {data.video && 
                <ModalVideo 
                  id={data.video.id} 
                  src={data.video.url} 
                  title={data.video.title} 
                  transcript={data.video.transcript} 
                  modalButton = {
                      <button type="button" className="btn btn-outline-info my-4">
                          <i className="fa-solid fa-play"></i> Watch Video<span className="visually-hidden">: {data.video.title}</span>
                      </button>
                  }
              />}
          </div>
      </div>
    )
};

export default EconImpactProvincialImpactOnehealth;