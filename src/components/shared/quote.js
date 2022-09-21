import React from "react"
import styled from "styled-components"

const QuoteMark = styled.i`
    color: var(--uog-blue);
`
const QuoteText = styled.p`
    color: #FFF;
    & strong {
      color: #FFF;
    }
`
const QuoteShadow = styled.div`
  text-shadow: #000 1px 0 4px;
`

function Quote (props) {
  let text = props.text;
  let source = props.source;
  let source_description = props.source_description;

  return text ? (
    <QuoteShadow>
      <QuoteText className="display-4 my-5">
        <QuoteMark className="fad fa-quote-left pe-2" aria-hidden="true" /> 
            <em>{text}</em>
        <QuoteMark className="fad fa-quote-right ps-2" aria-hidden="true" />
      </QuoteText>

      <QuoteText className="author fs-2"><strong>{source}</strong>
      <br /><em>{source_description}</em></QuoteText>
    </QuoteShadow>
  ) : null
}

export default Quote
