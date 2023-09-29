import { useEffect, useState } from "react";
import { Route, Routes, useNavigate, useSearchParams } from "react-router-dom";

import Nav from "./components/Nav";
import Header from "./components/Header";
import Home from "./components/Home";
import NewPost from "./components/NewPost";
import Missing from "./components/Missing";
import PostPage from "./components/PostPage";
import Footer from "./components/Footer";
import About from "./components/About";
import EditPost from "./components/EditPost";
import api from "./apis/posts";
import useWindowResize from "./hooks/useWindowResize";

import "./App.css";

function App() {
  const [posts, setPosts] = useState([]);
  const [postTitle, setPostTitle] = useState("");
  const [post, setPost] = useState("");
  const [search, setSearch] = useState("");
  const [editTitle, setEditTitle] = useState("");
  const [editBody, setEditBody] = useState("");
  const [fetchError, setFetchError] = useState("");
  const navigate = useNavigate("");
  const { width } = useWindowResize();

  useEffect(() => {
    const listsPost = JSON.parse(localStorage.getItem("blog")) || [];
    setPosts(listsPost);
  }, []);

  const handleDelete = (id) => {
    const list = posts.filter((post) => post.id != id);
    localStorage.setItem("blog", JSON.stringify(list));
    setPosts(list);
    navigate("/");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const id = posts.length ? posts[posts.length - 1].id + 1 : 1;
    console.log(id);
    const date = new Date();
    const postDate = date.toUTCString();
    const newTitle = postTitle;
    const newPost = post;
    const PostItem = { id, title: newTitle, body: newPost, datetime: postDate };

    const saveItem = [...posts, PostItem];
    localStorage.setItem("blog", JSON.stringify(saveItem));
    navigate("/");
    setPostTitle("");
    setPost("");
    setPosts(saveItem);
  };
  const handleEdit = (id, e) => {
    e.preventDefault();
    const date = new Date();
    const postDate = date.toUTCString();
    const itemToEdit = posts.filter((item) => item.id == id);
    itemToEdit[0].title = editTitle;
    itemToEdit[0].body = editBody;
    itemToEdit[0].datetime = postDate;
    localStorage.setItem("blog", JSON.stringify(posts));
    navigate("/");
    setPosts(posts);
  };

  return (
    <div className="App">
      <Header
        title="ReactJS Blog"
        search={search}
        setSearch={setSearch}
        width={width}
      />
      <Nav search={search} setSearch={setSearch} />
      <Routes>
        <Route
          path="/"
          element={
            <Home
              fetchError={fetchError}
              posts={
                !search
                  ? posts
                  : posts.filter(
                      (item) =>
                        item.body
                          .toLowerCase()
                          .includes(search.toLowerCase()) ||
                        item.title.toLowerCase().includes(search.toLowerCase())
                    )
              }
            />
          }
        />
        <Route
          path="posts"
          element={
            <NewPost
              handleSubmit={handleSubmit}
              post={post}
              setPost={setPost}
              title={postTitle}
              setPostTitle={setPostTitle}
            />
          }
        />
        <Route
          path="posts/edit/:id"
          element={
            <EditPost
              editBody={editBody}
              setEditBody={setEditBody}
              editTitle={editTitle}
              setEditTitle={setEditTitle}
              handleEdit={handleEdit}
              posts={posts}
            />
          }
        />
        <Route
          path="post/:id"
          element={<PostPage posts={posts} handleDelete={handleDelete} />}
        />
        <Route path="about" Component={About} />
        <Route path="*" Component={Missing} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
