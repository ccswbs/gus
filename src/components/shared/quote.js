import React from "react"
import styled from "styled-components"

const BlockQuote = styled.blockquote`
  background: none;
  margin: 0;
  padding: 0;
  text-align: start;

  :before, :after {
    content: none;
`
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
      <BlockQuote className="display-4 my-5">
        <QuoteMark className="fa-solid fa-quote-left pe-2" aria-hidden="true" /> 
            <em>{text}</em>
        <QuoteMark className="fa-solid fa-quote-right ps-2" aria-hidden="true" />
      </BlockQuote>

      <Author className="author fs-2"><strong>{source}</strong>
        <br /><em>{source_description}</em></Author>
    </div>
  ) : null
}

export default Quote
