const path = require('path')

module.exports.createPages = async ({ graphql, actions }) => {
    const { createPage } = actions

    // 1.  get absolute path (from the root of the hard-drive) to template
    const blogTemplate = path.resolve('./src/templates/blog.js')
    // 2. get Contentful posts' slugs
    const res = await graphql(`
        query {
            allContentfulBlogPost {
                edges {
                    node {
                        slug
                    }
                }
            }
        }
    `)
    // 3. create new pages
    res.data.allContentfulBlogPost.edges.forEach(edge => {
        createPage({
            component: blogTemplate,
            path: `/blog/${edge.node.slug}`,
            context: {
                slug: edge.node.slug,
            },
        })
    })
}
