// filepath: /Users/mmafe/Work/gus/src/components/shared/AccordionBody.js
import React from 'react';
import { ParseText } from 'utils/ug-utils';

const AccordionBody = ({ content }) => {
  console.log("AccordionBody content: ", content);
  return (
    <div className="accordion-body">
      <ParseText textContent={content} />
    </div>
  );
};

export default AccordionBody;