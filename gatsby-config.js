require("dotenv").config()
require("dotenv").config({
  path: `.env.${process.env.NODE_ENV}`,
})


module.exports = {
  pathPrefix: `/sagstads-spiseri`,
  siteMetadata: {
    title: `Sagstads Spiseri`,
    description: `Her er oppskrifter for de fleste. Kos dere`,
    author: `@gatsbyjs`,
  },
  plugins:
    [
      {
        resolve: 'gatsby-source-sanity',
        options: {
          projectId: '1d6wq8gz',
          dataset: 'production',
          overlayDrafts: true,
          token: 'skXFF9gHBCJwPYVOlEpAlTA4q0TJek0Et7jJUPzdpqwCCUKzWapWv4q6YxdbwOE7CEdS8B4x6fbCEh4EoGdwwjB6SeDaHw5mZfqKRKL3eYD41kO64g0P5VyKLr1JP8qTA8DOVsVWOLQFpmNxAlGHCbbAG4MEA7OupBD4oBMZ0mtUIbOjzVKh'
        }
      },
      `gatsby-plugin-sass`,
      `gatsby-plugin-react-helmet`,
      {
        resolve: `gatsby-source-filesystem`,
        options: {
          name: `images`,
          path: `${__dirname}/src/images`,
        },
      },
      `gatsby-transformer-sharp`,
      "gatsby-plugin-image",
      `gatsby-plugin-sharp`,
      {
        resolve: "gatsby-plugin-sanity-image",
        options: {
          // Sanity project info (required)
          projectId: "1d6wq8gz",
          dataset: "production",
        },
      },
      {
        resolve: `gatsby-plugin-manifest`,
        options: {
          name: `gatsby-starter-default`,
          short_name: `starter`,
          start_url: `/`,
          background_color: `#663399`,
          theme_color: `#663399`,
          display: `minimal-ui`,
          icon: `src/images/minibus-passengers.png`, // This path is relative to the root of the site.
        },
      },
      // this (optional) plugin enables Progressive Web App + Offline functionality
      // To learn more, visit: https://gatsby.dev/offline
      // `gatsby-plugin-offline`,
    ],
}
