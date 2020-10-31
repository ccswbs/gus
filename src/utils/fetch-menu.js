import { useStaticQuery, graphql } from "gatsby"

export const useMenuData = () => {
  const data = useStaticQuery(
    graphql`
      query {
        menuItems: allMenuItems {
		  edges {
			node {
			  id
			  menu_name
			  title
			  url
			  childMenuItems {
				title
				url
				route {
				  parameters {
					node
				  }
				}
			  }
			  parent {
				id
			  }
			  route {
				parameters {
				  node
				}
			  }
			}
		  }
		}
		news: allNodeArticle {
		  edges {
			node {
			  drupal_internal__nid
			  fields {
				alias {
				  value
				}
			  }
			}
		  }
	    }
		landing: allNodeLandingPage {
		  edges {
			node {
			  drupal_internal__nid
			  fields {
				alias {
				  value
				}
			  }
			}
		  }
	    }
		pages: allNodePage {
		  edges {
			node {
			  drupal_internal__nid
			  fields {
				alias {
				  value
				}
			  }
			}
		  }
	    }
		programs: allNodeProgram {
		  edges {
			node {
			  drupal_internal__nid
			  fields {
				alias {
				  value
				}
			  }
			}
		  }
	    }
      }
    `
  )
  return data;
}