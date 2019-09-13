module.exports = {
  pathPrefix: `/sagstads-spiseri`,
  siteMetadata: {
    title: `Sagstads Spiseri`,
    description: `Her er oppskrifter for de fleste. Kos dere`,
    author: `@gatsbyjs`,
  },
  plugins:
    [
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
    `gatsby-plugin-sharp`,
    {
      resolve: 'gatsby-source-sanity',
      options: {
        projectId: '1d6wq8gz',
        dataset: 'production',
        overlayDrafts: true,
        watchMode: true,
        token: 'skPnurK53fosLyecDbjKqkS5aRfK4AG3G5vAmLLImUwbdnM2vEL8JSc7z6ZnuCPvOJcNjPQOUiNMleUOzmbXvjcUIKMkdAjDVglFUAuf6x3WvH9P8MRlnqZGwpYtyzsHlkzNLyZikgrYt2CyIYsirzpDrJ9wBc3cMdkYFTrG906I0DWrqRs6'
      }
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
