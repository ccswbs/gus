import { useStaticQuery, graphql } from "gatsby"

export const useIconData = () => {
  const data = useStaticQuery(
    graphql`
      query {
        allMediaImage(filter: {relationships: {field_media_image: {localFile: {extension: {eq: "svg"}}}}}) {
		  edges {
			node {
			  relationships {
				field_media_image {
				  localFile {
					publicURL
				  }
				}
				field_tags {
				__typename
				... on TaxonomyInterface {
					name
				  }
				}
			  }
			}
		  }
		}
      }
    `
  )
  return data.allMediaImage.edges;
}