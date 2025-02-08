import React from 'react';

const ModalVideoStatic = ({ modalId = "ug-modal-video-loading"}) => {
  return (
    <div id={modalId} className="modal-video">
      <button type="button" className="play">
        <i className="fad fa-play-circle" aria-hidden="true"></i>
        <span className="visually-hidden">Loading video...</span>
      </button>
    </div>
  );
};

export default ModalVideoStatic;