import { useEffect, useState } from "react";

function JsonPlaceHolder() {
  const API_URL = "http://localhost:3000";

  const [users, setUsers] = useState();
  const [posts, setPosts] = useState([]);
  const [comments, setComments] = useState([]);
  const [fetchError, setFetchError] = useState([]);
  const [list, setList] = useState([]);
  const [context, setContext] = useState([]);

  useEffect(() => {
    const fetchItems = async () => {
      const USERS_API_URL = `${API_URL}/users`;
      const POSTS_API_URL = `${API_URL}/posts`;
      const COMMENTS_API_URL = `${API_URL}/comments`;
      const ITEMS_API_URL = `${API_URL}/items`;

      const URL = [USERS_API_URL, POSTS_API_URL, COMMENTS_API_URL];
      try {
        const responseItem = await fetch(ITEMS_API_URL);
        const listItem = await responseItem.json();
        setList(listItem);

        const responseUser = await fetch(URL[0]);
        const listUser = await responseUser.json();
        setUsers(listUser);

        const responsePost = await fetch(URL[1]);
        const listPost = await responsePost.json();
        setPosts(listPost);

        const responseComment = await fetch(URL[2]);
        const listComment = await responseComment.json();
        setComments(listComment);

        if (
          !responseItem.ok ||
          !responseUser.ok ||
          !responsePost.ok ||
          !responseComment.ok
        ) {
          setFetchError(fetchError);
        }
      } catch (error) {
        setFetchError(error.message);
      }
    };
    fetchItems();
  }, []);

  const handleUsers = () => {
    const myContent = "users";
    setContext(myContent);
  };
  const handlePosts = () => {
    const myContent = "posts";
    setContext(myContent);
  };
  const handleComments = () => {
    const myContent = "comments";
    setContext(myContent);
  };
  return (
    <>
      <form className="jsonplaceholder" onSubmit={(e) => e.preventDefault()}>
        <div className="sticky">
          <button className="json-button" onClick={handleUsers}>
            Users
          </button>
          <button className="json-button" onClick={handlePosts}>
            Posts
          </button>
          <button className="json-button" onClick={handleComments}>
            Comments
          </button>
        </div>
      </form>
      <div className="content">
        {context.length ? (
          context == "users" ? (
            <table>
              <tbody>
                {users.map((item) => (
                  <tr key={item.id}>
                    <td>{item.id}</td>
                    <td>{item.name}</td>
                    <td>{item.username}</td>
                    <td>{item.email}</td>
                    <td>{JSON.stringify(item.adress)}</td>
                    <td>{item.phone}</td>
                    <td>{item.website}</td>
                    <td>{JSON.stringify(item.company)}</td>
                  </tr>
                  // <li key={item.id}>{JSON.stringify(item)}</li>
                ))}
              </tbody>
            </table>
          ) : context == "posts" ? (
            <table>
              <tbody>
                {posts.map((item) => (
                  <tr key={item.id}>
                    <td>{item.userId}</td>
                    <td>{item.id}</td>
                    <td>{item.title}</td>
                    <td>{item.body}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <table>
              <tbody>
                {comments.map((item) => (
                  <tr key={item.id}>
                    <td>{item.postId}</td>
                    <td>{item.id}</td>
                    <td>{item.name}</td>
                    <td>{item.email}</td>
                    <td>{item.body}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )
        ) : (
          <p className="error">{fetchError}</p>
        )}
      </div>
    </>
  );
}
export default JsonPlaceHolder;
