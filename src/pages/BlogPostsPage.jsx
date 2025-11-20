import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function BlogPostsPage() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState("");

  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [content, setContent] = useState("");

  useEffect(() => {
    async function loadPosts() {
      try {
        setLoading(true);
        setErrorMsg("");

        //Call the JSONPlaceholder API which fetches test blog posts
        const res = await fetch("https://jsonplaceholder.typicode.com/posts");

        //If the server didn't respond throw an error
        if (!res.ok) throw new Error("Failed to load posts");

        //Turn the response into objects
        const data = await res.json();

        //Keep the first 20 to keep the page shorter
        setPosts(data.slice(0, 20));
      } catch (err) {
        setErrorMsg(err.message || "Could not load posts.");
      } finally {
        setLoading(false);
      }
    }

    loadPosts();
  }, []);

  //Adds a "local" post to the top
  function handleAddLocalPost(e) {
    e.preventDefault();
    const t = title.trim();
    const c = content.trim();
    if (!t || !c) return;

    const newPost = {
      id: Date.now(), //fake id for the UI
      title: t,
      body: c, //JSONPlaceholder uses "body" for content field name
      author: author.trim() || "Anonymous",
      isLocal: true,
    };
    setPosts((prev) => [newPost, ...prev]);

    setTitle("");
    setAuthor("");
    setContent("");
  }

  return (
    <div>
      <div element="section1">
        <h1>Blog Posts</h1>

        {/*Local create form*/}
        <div className="post-card" style={{ marginBottom: "1rem" }}>
          <h3>Create a new post</h3>
          <form onSubmit={handleAddLocalPost} className="form-stack">
            <input
              className="comment-input"
              placeholder="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <input
              className="comment-input"
              placeholder="Author (optional)"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
            />
            <input
              className="comment-input"
              placeholder="Content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
            <button className="btn" type="submit">Add Post</button>
          </form>
        </div>
      </div>
      <div element="section2">
        {/*Show messages while loading or on errors*/}
        {loading && <p>Loading posts…</p>}
        {!loading && errorMsg && (
          <p style={{ color: "crimson" }}>{errorMsg}</p>
        )}

        {/*Render the list after loading*/}
        <ul className="post-list">
          {!loading &&
            !errorMsg &&
            posts.map((post) => (
              <li key={post.id} className="post-card">
                <h2 className="post-title">
                  <Link to={`/post/${post.id}`}>{post.title}</Link>
                </h2>

                {/*body is the content the API gives us*/}
                <p>{(post.body || "").slice(0, 120)}...</p>

                <div className="meta">
                  <span>
                    <b>Source:</b> posts
                  </span>
                </div>

                <div style={{ marginTop: ".5rem" }}>
                  <Link to={`/post/${post.id}`} className="btn btn-outline">
                    Open
                  </Link>
                </div>
              </li>
            ))}
        </ul>
      </div>
    </div>
  );
}
