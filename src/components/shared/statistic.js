import React from "react"
import styled from "styled-components"

const StatCard = styled.div`
  background: var(--uog-blue-muted);
  border-left: 1rem solid ${props => (props.colour ?? "#000000")};
  flex: 1 0;
  padding: 1.25rem;
  min-width: 25%;
  word-wrap: break-word;
`
const StatValue = styled.dt`
  color: #000;
  font-size: 4.25rem;
`
const StatType = styled.dd`
  font-size: 1.8rem;
  line-height: 1.58;
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
  <StatValue>
    {children}
  </StatValue>
)

Statistic.Type = ({children}) => (
  <StatType>
    {children}
  </StatType>
)


export default Statistic