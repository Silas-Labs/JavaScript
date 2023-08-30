import React from "react";
import { Link } from "react-router-dom";
import Post from "./Post";

const Feed = ({ posts }) => {
  return (
    <div>
      {posts &&
        posts.map((post) => (
          <ul key={post.id} id="post-list">
            <Post post={post} />
            <hr />
          </ul>
        ))}
      {!posts && <p>Nothing to display on FEED</p>}
    </div>
  );
};

export default Feed;
