import { useStaticQuery, graphql } from "gatsby"

export const useMenuData = () => {
  const data = useStaticQuery(
    graphql`
      query {
        allMenuItems {
		  edges {
			node {
			  id
			  menu_name
			  title
			  url
			}
		  }
		}
      }
    `
  )
  return data.allMenuItems.edges;
}