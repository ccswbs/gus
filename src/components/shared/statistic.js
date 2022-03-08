import React from "react"
import styled from "styled-components"

const StatCard = styled.div`
  background: var(--uog-blue-muted);
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
  & > dt {
    color: ${props => (props.colour ?? "#ffffff")};
  }
`;
const StatValue = styled.dt`
  color: #000;
  font-size: 4.25rem;
  line-height: 1.2;
  margin-bottom: 1.5rem;
`
const StatType = styled.dd`
  font-size: 1.8rem;
  line-height: 1.58;
`
const StatIcon = styled.i`
  color: #000;
`

const Statistic = ({id, children, className=""}) => (
  <dl id={id} className={`${className}`}>
      {children}
  </dl>
)

Statistic.Card = ({children}) => (
  <StatCard className="h-100">
    {children}
  </StatCard>
)

Statistic.BorderCard = ({border, children, className=""}) => (
  <StatBorderCard border={border} className={`${className} h-100`}>
    {children}
  </StatBorderCard>
)

Statistic.SolidCard = ({background, colour, children, className=""}) => (
    <StatSolidCard background={background} colour={colour} className={`${className} h-100`}>
      {children}
    </StatSolidCard>
)

Statistic.Icon = ({icon}) => (
  <StatIcon className={`${icon} mt-3 fa-4x`} aria-hidden="true" />
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