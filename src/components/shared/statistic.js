import React from "react"
import styled from "styled-components"

const StatCard = styled.div`
  background: var(--uog-blue-muted);
  border-left: 1rem solid ${props => (props.colour ? `var(${props.colour})`: "#000000")};
  flex: 1 0;
  padding: 1.25rem;
  min-width: 25%;
  word-wrap: break-word;
`

const Statistic = ({id, children, className=""}) => (
  <dl id={id} className={`card-group stats ${className}`}>
      {children}
  </dl>
)

Statistic.Card = ({colour, children}) => (
  <Statistic>
    <StatCard colour={colour}>
      {children}
    </StatCard>
  </Statistic>
)

Statistic.Icon = ({icon}) => (
  <span className="fa-icon-colour">
    <i className={icon}>  </i>
  </span>
)

Statistic.Value = ({children}) => (
  <dt>
    {children}
  </dt>
)

Statistic.Type = ({children}) => (
  <dd>{children}</dd>
)


export default Statistic