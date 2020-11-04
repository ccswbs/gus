import { useStaticQuery, graphql } from "gatsby"

export const useMenuData = () => {
  const data = useStaticQuery(
    graphql`
      query {
        menus: allMenuItems {
		  edges {
			node {
			  id
			  menu_name
			  title
			  children {
				... on MenuItems {
					title
					route {
					parameters {
						node
					}
					}
					children {
						... on MenuItems {
							title
							route {
								parameters {
								node
								}
							}
						}
					}
				}
			  }
			  route {
				parameters {
				  node
				}
			  }
			  parent {
				id
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