import React from "react"
import styled from "styled-components"

const StatCard = styled.div`
  background: var(--uog-blue-muted);
  border-left: 1rem solid ${props => (props.border ?? "#000000")};
  color: #000000;
  flex: 1 0;
  padding: 1.25rem;
  min-width: 25%;
  word-wrap: break-word;
`
const StatSolidCard = styled.div`
  background: ${props => (props.background ?? "#000000")};
  color: ${props => (props.colour ?? "#ffffff")};
  min-width: 25%;
  padding: 1.25rem;
  text-align: center;
  word-wrap: break-word;
`
const StatValue = styled.dt`
  font-size: 4.25rem;
`
const StatType = styled.dd`
  font-size: 1.8rem;
  line-height: 1.58;
`

const Statistic = ({id, children, className=""}) => (
  <dl id={id} className={`${className}`}>
      {children}
  </dl>
)

Statistic.Card = ({border, children, className=""}) => (
  <StatCard border={border} className={`${className}`}>
    {children}
  </StatCard>
)

Statistic.SolidCard = ({background, colour, children, className=""}) => (
    <StatSolidCard background={background} colour={colour} className={`${className}`}>
      {children}
    </StatSolidCard>
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