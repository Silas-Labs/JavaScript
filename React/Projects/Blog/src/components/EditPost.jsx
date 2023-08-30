import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { Link } from "react-router-dom";

const EditPost = ({
  handleEdit,
  posts,
  editTitle,
  setEditTitle,
  editBody,
  setEditBody,
}) => {
  const { id } = useParams();
  const list = posts.find((item) => item.id == id);

  useEffect(() => {
    try {
      setEditTitle(list.title);
      setEditBody(list.body);
    } catch (error) {
      console.log(error.stack);
    }
  }, [posts]);
  return (
    <main>
      {list && (
        <form id="new-post">
          <div>
            <h2>Edit Post</h2>
            <input
              id="post-title"
              type="text"
              placeholder="Title..."
              required
              onChange={(e) => setEditTitle(e.target.value)}
              value={editTitle}
            />
          </div>
          <div>
            <textarea
              id="post-body"
              value={editBody}
              required
              onChange={(e) => setEditBody(e.target.value)}
            />
          </div>
          <button
            id="submit-post"
            type="submit"
            onClick={(e) => handleEdit(id, e)}
          >
            Save Changes
          </button>
        </form>
      )}
      {!list && (
        <>
          <h2>Post not found</h2>
          <p>Well, that's disappointing.</p>
          <p>
            <Link to="/">Visit our Homepage</Link>
          </p>
        </>
      )}
    </main>
  );
};

export default EditPost;
