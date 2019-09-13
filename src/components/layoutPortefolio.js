/**
 * LayoutPortefolio component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from "react"
import PropTypes from "prop-types"
import { useStaticQuery, graphql } from "gatsby"

import Header from "./header"
import "./layout.css"

const LayoutPortefolio = ({ children }) => {
  const data = useStaticQuery(graphql`
    query titleQuery {
      site {
        siteMetadata {
          title
        }
      }
    }
  `)

  return (
    <>
      <div
        style={{
          margin: `0 auto`,
          width: '100%',
          maxWidth: '100%',
          padding: `0px 0rem 0rem`,
          paddingTop: 0,
        }}
      >
        <main>{children}</main>
        <footer>
        </footer>
      </div>
    </>
  )
}

LayoutPortefolio.propTypes = {
  children: PropTypes.node.isRequired,
}

export default LayoutPortefolio
