import { useStaticQuery, graphql } from "gatsby"

export const useImageData = () => {
  const imageData = useStaticQuery(
    graphql`
      query {
        allMediaImage(filter: {relationships: {field_media_image: {localFile: {extension: {eq: "jpg"}}}}}) {
		  edges {
			node {
			  field_media_image {
                alt
              }
			  relationships {
				field_media_image {
				  localFile {
					childImageSharp {
                      fluid {
                        originalImg
                        ...GatsbyImageSharpFluid
                      }
				    }
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
  return imageData.allMediaImage.edges;
}