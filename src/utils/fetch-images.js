import PropTypes from 'prop-types';
import { isSubset } from 'is-subset';
import { useStaticQuery, graphql } from 'gatsby';
import Img from 'gatsby-image';

function FetchImages ({tags}) {
	
	let tagNames = [];

  const data = useStaticQuery(
    graphql`
      query {
        allMediaImage {
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
					extension
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
    `)
	
	//let nonSVG = data.allMediaImage.edges.filter(edge => edge.node.relationships.field_tags.name === "BAG");
	//let svgFiles = data.allMediaImage.edges.filter(edge => edge.node.relationships.field_media_image.localFile.extension === "svg");
	
	for (let i = 0; i < data.allMediaImage.edges.length; i++) {
		if (data.allMediaImage.edges[i].node.relationships.field_tags != null) {			
			let imgTags = data.allMediaImage.edges[i].node.relationships.field_tags;
			imgTags.forEach(imgTag => {tagNames.push(imgTag.name)});			
		}		
	}
	console.log(tagNames);
	
	//console.log(isSubset(tagNames,tags));
	
	return null	  
	
}

export default FetchImages

FetchImages.propTypes = {
	tags: PropTypes.array,
	ext: PropTypes.string,
}
FetchImages.defaultProps = {
	tags: null,
	ext: "jpg",
}