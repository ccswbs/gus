import React from 'react';
import { ParseText } from 'utils/ug-utils';

const AccordionBody = ({ content }) => {
  return (
    <div className="accordion-body">
      <ParseText textContent={content} />
    </div>
  );
};

export default AccordionBody;