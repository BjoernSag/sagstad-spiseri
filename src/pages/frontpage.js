import React from "react"
import { Link, graphql } from "gatsby"
import Image from "gatsby-image"

import Layout from "../components/layout"

import SEO from "../components/seo"

export const query = graphql`
{
allSanityProject {
  edges{
    node {
      title,
      subtitle,
      id,
      slug {
        current
      },
      image{
       asset {
        _createdAt,
        _id,
        fluid {
          ...GatsbySanityImageFluid,
        }
      }
      },
    }
  }
}
}
`;

const IndexPage = ( { data }) => (
  <Layout>
    <SEO title="Home" />
    <h1>My portfolio</h1>
    <ul style={{listStyle: 'none', display: 'flex', alignItems: 'space-between', padding:0}}>
      {data.allSanityProject.edges.map(({node: project}) => (
        <li
        key={project.slug.current}
        style={{flex: '1 45%', maxWidth: '45%', margin: '1rem'}}
        >
          <h2>
            <Link to={project.slug.current}>{project.title}</Link>
            </h2>
          <Image fluid={project.image.asset.fluid} alt={project.title}/>
          <p style={{marginTop:'1rem'}}>{project.subtitle}</p>
          <Link to={project.slug.current}>See more</Link>
        </li>
      ))}
    </ul>
  </Layout>
)

export default IndexPage
