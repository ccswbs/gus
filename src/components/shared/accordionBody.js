// filepath: /Users/mmafe/Work/gus/src/components/shared/AccordionBody.js
import React from 'react';
import { ParseText } from 'utils/ug-utils';

const AccordionBody = ({ content }) => {
  return (
    <div className="accordion-body">
      <ParseText text={content} />
    </div>
  );
};

export default AccordionBody;