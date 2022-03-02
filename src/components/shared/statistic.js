import React from "react"
import styled from "styled-components"

const StatCard = styled.div`
  background: var(--uog-blue-muted);
  color: #000000;
  flex: 1 0;
  padding: 1.25rem;
  min-width: 25%;
  word-wrap: break-word;
  text-align: center;
`
const StatBorderCard = styled(StatCard)`
  border-left: 1rem solid ${props => (props.border ?? "#000000")};
  text-align: left;
`;
const StatSolidCard = styled(StatCard)`
  background: ${props => (props.background ?? "#000000")};
  color: ${props => (props.colour ?? "#ffffff")};
`;
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

Statistic.Card = ({children}) => (
  <StatCard>
    {children}
  </StatCard>
)

Statistic.BorderCard = ({border, children, className=""}) => (
  <StatBorderCard border={border} className={`${className}`}>
    {children}
  </StatBorderCard>
)

Statistic.SolidCard = ({background, colour, children, className=""}) => (
    <StatSolidCard background={background} colour={colour} className={`${className}`}>
      {children}
    </StatSolidCard>
)

Statistic.Icon = ({icon}) => (
  <span className="fa-icon-colour">
    <i className={icon} aria-hidden="true">  </i>
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