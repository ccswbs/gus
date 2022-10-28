import React from "react"
import styled from "styled-components"

const Author = styled.p`
    strong {
      color: inherit;
    }
`
const QuoteMark = styled.i`
  color: var(--uog-blue);
`

function Quote (props) {
  let text = props.text;
  let source = props.source;
  let source_description = props.source_description;

  return text ? (
    <div>
      <blockquote className="my-5 display-4 fw-normal blockquote-plain">
        <QuoteMark className="display-4 fa-solid fa-quote-left pe-2" aria-hidden="true" /> 
          <em>{text}</em>
        <QuoteMark className="display-4 fa-solid fa-quote-right ps-2" aria-hidden="true" />
      </blockquote>
      <Author className="author fs-2"><strong>{source}</strong>
        <br /><em>{source_description}</em></Author>
    </div>
  ) : null
}

export default Quote
