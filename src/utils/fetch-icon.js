import { useStaticQuery, graphql } from "gatsby"

export const useIconData = () => {
  const data = useStaticQuery(
    graphql`
      query {
        allMediaImage(filter: {relationships: {field_media_image: {mimeType: {eq: "image/svg+xml"}}}}) {
		  edges {
			node {
			  relationships {
				field_media_image {
                  publicUrl
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