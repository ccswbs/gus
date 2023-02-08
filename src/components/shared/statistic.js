import React from "react"
import styled from "styled-components"
import classNames from "classnames"
import "styles/stats.css"

/* Accessible definition lists can only have one nested div.
In order to achieve gap between bordered stats, use grid instead of row-cols-* */

let txtAlign = "center";

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

const Statistic = ({id, children, classes}) => (
  <dl id={id} className={classNames(classes)}>
      {children}
  </dl>
)

Statistic.Grid = ({id, children, classes}) => (
  <dl id={id} className={classNames(classes)} data-title="Solid Color Stats">
      {children}
  </dl>
)

Statistic.Card = ({children}) => (
  <div className="h-100">
    {children}
  </div>
)

Statistic.BorderCard = ({border, children, classes}) => (
  <div className={classNames("h-100",classes)}>
    {children}
  </div>
)

Statistic.SolidCard = ({children, classes}) => (
    <div className={classNames(classes)}>
      {children}
    </div>
)

Statistic.Icon = ({icon, colour}) => (
  <i colour={colour} className={classNames("mt-3 fa-4x",icon)} aria-hidden="true" />
)

Statistic.Value = ({children, classes}) => (
  <dt className={classNames("stat-value",classes)}>
    {children}
  </dt>
)

Statistic.Type = ({children, classes}) => (
  <dd className={classNames("stat-type",classes)}>
    {children}
  </dd>
)

export default Statistic