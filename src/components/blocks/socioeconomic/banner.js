import React from "react"
import { StaticQuery, graphql } from "gatsby"
import { GatsbyImage, getImage } from "gatsby-plugin-image"
import Banner from "components/shared/banner"

const render = ({ image, title }) => (
    getImage(image.src)  
        ? <Banner>
            <GatsbyImage image={getImage(image.src)} className="cover-img" alt={image.alt} />
            <Banner.FancyTitle>{title}</Banner.FancyTitle>
          </Banner>
        : <Banner.NoImage />
)

const query = graphql`
  query {
    socioeconomicYaml(id: {eq: "socioeconomic_banner"}) {
      id
      title
      image {
        src {
          childImageSharp {
            gatsbyImageData
          }
        }
        alt
      }
    }
  }
`

export default function SocioEconomicBanner () {
  return <StaticQuery query={query} render={({socioeconomicYaml}) => render(socioeconomicYaml)} />
}