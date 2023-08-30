import React from "react";

const NewPost = ({ handleSubmit, post, setPost, postTitle, setPostTitle }) => {
  return (
    <form onSubmit={handleSubmit} id="new-post">
      <div>
        <h2>New Post</h2>
        <input
          id="post-title"
          type="text"
          placeholder="Title..."
          required
          onChange={(e) => setPostTitle(e.target.value)}
          value={postTitle}
        />
      </div>
      <div>
        <textarea
          id="post-body"
          value={post}
          required
          onChange={(e) => setPost(e.target.value)}
        />
      </div>
      <button id="submit-post" type="submit" onClick={handleSubmit}>
        Add Post
      </button>
    </form>
  );
};

export default NewPost;
