import React from "react"
import styled from "styled-components"
import classNames from "classnames"
import "styles/stats.css"

/* Accessible definition lists can only have one nested div.
In order to achieve gap between bordered stats, use grid instead of row-cols-* */

let txtAlign = 

const classStatCard = classNames("default-card-bg",txtAlign);


const StatCard = styled.div`
  background: #f5f7fa;
  padding: 1.25rem;
  min-width: 25%;
  word-wrap: break-word;
  text-align: center;
`;
const StatBorderCard = styled(StatCard)`
  border-left: 1rem solid ${props => (props.border ?? "#000000")};
  text-align: left;
`;
const StatSolidCard = styled(StatCard)`
  background: ${props => (props.background ?? "#000000")};
  color: ${props => (props.colour ?? "#ffffff")};
  && > dd a {
    color: ${props => (props.colour ?? "#ffffff")} !important;
  }
  & > dt {
    color: ${props => (props.colour ?? "#ffffff")};
  }
`;
const StatValue = styled.dt`
  color: #000;
  font-size: ${props => (props.fontsize ?? "3.25rem")};
  line-height: 1.2;
  margin-bottom: 1.2rem;
`
const StatType = styled.dd`
  font-size: 1.8rem;
  line-height: 1.58;
  & > a {
    color: #0068ad !important;
  }

  & > a:hover,
  & > a:focus {
    color: #ffffff !important;
  }
`;
const StatIcon = styled.i`
  color: ${props => (props.colour ?? "#000")};
`;

const Statistic = ({id, children, classes=""}) => (
  <dl id={id} className={classNames("statistic-grid",classes)}>
      {children}
  </dl>
)

Statistic.Grid = ({id, children, columns, className=""}) => (
  <dl id={id} columns={columns} className={`${className}`}>
      {children}
  </dl>
)

Statistic.Card = ({children}) => (
  <div className="h-100">
    {children}
  </div>
)

Statistic.BorderCard = ({border, children, className=""}) => (
  <StatBorderCard border={border} className={`${className} h-100`}>
    {children}
  </StatBorderCard>
)

Statistic.SolidCard = ({background, colour, children, className=""}) => (
    <div className={`${className} align-self-stretch`}>
      {children}
    </div>
)

Statistic.Icon = ({icon, colour}) => (
  <StatIcon colour={colour} className={`${icon} mt-3 fa-4x`} aria-hidden="true" />
)

Statistic.Value = ({children, fontsize, className=""}) => (
  <StatValue className={className} fontsize={fontsize}>
    {children}
  </StatValue>
)

Statistic.Type = ({children, className=""}) => (
  <StatType className={className}>
    {children}
  </StatType>
)

export default Statistic