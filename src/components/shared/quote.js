import React from "react"
import styled from "styled-components"

const QuoteMark = styled.i`
    color: var(--uog-blue);
`

function Quote (props) {
  let text = props.text;
  let source = props.source;
  let source_description = props.source_description;

  return text ? (
    <div>
      <p className="display-4 my-5">
        <QuoteMark className="fa-solid fa-quote-left pe-2" aria-hidden="true" /> 
            <em>{text}</em>
        <QuoteMark className="fa-solid fa-quote-right ps-2" aria-hidden="true" />
      </p>

      <p className="author fs-2"><strong>{source}</strong>
        <br /><em>{source_description}</em></p>
    </div>
  ) : null
}

export default Quote
