import React from 'react'
import { graphql } from 'gatsby'
import { documentToReactComponents } from '@contentful/rich-text-react-renderer'

import Layout from '../components/layout'
import Head from '../components/head'

// for markdown posts -->>
// export const query = graphql`
//     query($slug: String!) {
//         markdownRemark(fields: { slug: { eq: $slug } }) {
//             frontmatter {
//                 title
//                 date
//             }
//             html
//         }
//     }
// `

// for Contentful CMS Blog Posts -->>
export const query = graphql`
    query($slug: String!) {
        contentfulBlogPost(slug: { eq: $slug }) {
            title
            publishedDate(formatString: "MMMM Do, YYYY")
            body {
                json
            }
        }
    }
`

const Blog = ({ data }) => {
    // console.log(data)

    const options = {
        renderNode: {
            'embedded-asset-block': node => {
                const alt = node.data.target.fields.title['en-US']
                const src = node.data.target.fields.file['en-US'].url
                return <img src={src} alt={alt} />
            },
        },
    }

    return (
        <Layout>
            <Head title={data.contentfulBlogPost.title} />
            <h1>{data.contentfulBlogPost.title}</h1>
            <p>{data.contentfulBlogPost.publishedDate}</p>
            {documentToReactComponents(
                data.contentfulBlogPost.body.json,
                options
            )}
        </Layout>
    )
}

export default Blog
