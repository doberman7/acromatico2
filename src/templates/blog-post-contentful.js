import React from "react";
import { graphql } from "gatsby";
import get from "lodash/get";
import Layout from "../components/layout";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";

import heroStyles from "../components/hero.module.css";

class BlogPostContentfulTemplate extends React.Component {
  render() {
    const post = this.props.data.contentfulPost;
    const baseURL = "https:";
    // https: console.log(baseURL + post.media.file.url);
    const image = baseURL + post.media.file.url;

    return (
      <Layout location={post.location}>
        <div style={{ background: "#fff" }}>
          <div className={heroStyles.hero}>By: {post.author}</div>
          <div className="wrapper">
            <h1 className="section-headline">{post.title}</h1>
            <p
              style={{
                display: "block",
              }}
            >
              SUBTITTLE: {post.subtitle}
            </p>
            <img src={image} alt="A dog smiling in a party hat" />;
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
