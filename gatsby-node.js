const Promise = require("bluebird");
const path = require("path");

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions;

  return new Promise((resolve, reject) => {
    const blogPost = path.resolve("./src/templates/blog-post-contentful.js");
    resolve(
      graphql(
        `
          {
            allContentfulPost {
              edges {
                node {
                  slug
                  title
                }
              }
            }
          }
        `
      ).then((result) => {
        if (result.errors) {
          console.log(result.errors);
          reject(result.errors);
        }

        const posts = result.data.allContentfulPost.edges;

        posts.forEach((post, index) => {
          const previous = index === 0 ? null : posts[index - 1].node;
          const next =
            index === posts.length - 1 ? null : posts[index + 1].node;
        });
      })
    );
  });
};
