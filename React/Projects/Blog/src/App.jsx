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
    const fetchPosts = async () => {
      try {
        const response = await api.get("/posts");
        setPosts(response.data);
      } catch (error) {
        setFetchError(error.message);
      }
    };
    fetchPosts();
  }, []);

  useEffect(() => {
    const listsPost = posts;
    setPosts(listsPost);
  }, [posts, search]);

  const handleDelete = async (id) => {
    const list = posts.filter((post) => post.id != id);
    try {
      await api.delete(`/posts/${id}`);
      navigate("/");
      setPosts(list);
    } catch (error) {
      console.log(`Error: ${error.message}`);
    }
  };
  const handleSubmit = async (e) => {
    console.info("");
    e.preventDefault();
    const id = posts.length ? posts[posts.length - 1].id + 1 : 1;

    const date = new Date();
    const postDate = date.toUTCString();
    const newTitle = postTitle;
    const newPost = post;
    const PostItem = { id, title: newTitle, body: newPost, datetime: postDate };
    try {
      const response = await api.post("/posts", PostItem);
      const addPost = [...posts, response.data];
      setPosts(addPost.reverse());
      setPostTitle("");
      setPost("");
      navigate("/");
    } catch (error) {
      if (error.response) {
        console.log(error.response.status);
        console.log(error.headers.data);
        console.log(error.response.data);
      } else {
        console.log(`Error: ${error.message}`);
      }
    }
  };
  const handleEdit = async (id, e) => {
    e.preventDefault();
    const date = new Date();
    const postDate = date.toUTCString();
    const PostItem = {
      id,
      title: editTitle,
      body: editBody,
      datetime: postDate,
    };

    try {
      const response = await api.put(`/posts/${id}`, PostItem);
      setPosts(
        posts.map((post) => (post.id == id ? { ...response.data } : post))
      );
      setEditBody("");
      setEditTitle("");
      navigate("/");
    } catch (error) {
      console.log(`Error: ${error.message}`);
    }
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
