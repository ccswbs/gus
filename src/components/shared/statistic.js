import React from "react"
import classNames from "classnames"
import "styles/stats.css"

/* Accessible definition lists can only have one nested div.
In order to achieve gap between bordered stats, use grid instead of row-cols-* */

const Statistic = ({children, classes}) => (
  <dl className={classNames(classes)}>
      {children}
  </dl>
)

Statistic.Grid = ({children, classes}) => (
  <dl className={classNames(classes)} data-title="Statistics Grid">
      {children}
  </dl>
)

Statistic.Card = ({children, classes}) => (
  <div className={classNames(classes)}>
    {children}
  </div>
)

Statistic.BorderCard = ({children, classes}) => (
  <div className={classNames(classes)}>
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