import React from "react";
import Feed from "./Feed";

const Home = ({ posts, fetchError }) => {
  return (
    <main>
      {!fetchError ? (
        posts.length ? (
          <Feed posts={posts} />
        ) : (
          <>
            <p>Nothing to display</p>
          </>
        )
      ) : (
        <p style={{ color: "red" }}>{fetchError}</p>
      )}
    </main>
  );
};

export default Home;
