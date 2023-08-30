import React from "react";
import { Link, useParams } from "react-router-dom";

const Post = ({ post }) => {
  const body = post.body;
  console.log(body);
  return (
    // {/*`/posts/${post.id}`*/}
    <article>
      {post && (
        <>
          <Link to={`/post/${post.id}`}>
            <h2>{post.title}</h2>
            <p>{post.datetime}</p>
          </Link>
          <p>{body}</p>
        </>
      )}
      {!post && (
        <>
          <h2>Post not found</h2>
          <p>Well, that's disappointing.</p>
          <p>
            <Link to="/">Visit our Homepage</Link>
          </p>
        </>
      )}
    </article>
  );
};

export default Post;
