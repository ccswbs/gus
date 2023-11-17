import React from "react"
import { Link as GatsbyLink } from "gatsby"

export default function Link({ children, to, ...rest }) {
  const internal = /^\/(?!\/)/.test(to)
  return internal ?
    <GatsbyLink to={to} {...rest}>{children}</GatsbyLink> :
    <a href={to} {...rest}>{children}</a>
}