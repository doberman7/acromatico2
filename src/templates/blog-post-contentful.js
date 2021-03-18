import React from "react";
import { graphql } from "gatsby";
import { Helmet } from "react-helmet";
import get from "lodash/get";
import Img from "gatsby-image";
import Layout from "../components/layout";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";

import heroStyles from "../components/hero.module.css";

class BlogPostContentfulTemplate extends React.Component {
  render() {
    const post = this.props.data.contentfulPost;
    const siteTitle = get(this.props, "data.site.siteMetadata.title");
    const { previous, next } = this.props.pageContext;
    console.log({ ...post });

    return (
      <Layout location={post.location}>
        <div style={{ background: "#fff" }}>
          {/* <Helmet title={`${post.title} | ${siteTitle}`} /> */}
          <div className={heroStyles.hero}>
            {/* <Img
              className={heroStyles.heroImage}
              alt={post.title}
              fluid={post.heroImage.fluid}
            /> */}
          </div>
          <div className="wrapper">
            <h1 className="section-headline">{post.title}</h1>
            <p
              style={{
                display: "block",
              }}
            >
              By: {post.author}
            </p>
            <p
              style={{
                display: "block",
              }}
            >
              SUBTITTLE: {post.subtitle}
            </p>

            <p> {documentToReactComponents(post.content.json)}</p>
          </div>
        </div>
      </Layout>
    );
  }
}

export default BlogPostContentfulTemplate;

export const pageQuery = graphql`
  query ContentfulBlogPostBySlug($slug: String!) {
    site {
      siteMetadata {
        title
      }
    }

    contentfulPost(slug: { eq: $slug }) {
      title
      subtitle
      author
      slug
      content {
        json
      }
      media {
        file {
          contentType
          url
        }
      }
    }
  }
`;
