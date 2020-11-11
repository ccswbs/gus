import { useStaticQuery, graphql } from "gatsby"

export const useMenuData = () => {
  const data = useStaticQuery(
    graphql`
      query {
		site {
		  siteMetadata {
			menus
		  }
		}
      }
    `
  )
  return data.site.siteMetadata.menus;
}