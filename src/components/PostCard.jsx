import React from "react";
import CommentForm from "./CommentForm.jsx";

export default function PostCard({
  post,                //title, content, date
  user,                //name, email or null while loading
  comments = [],       //list of comments to show
  onAddComment,        //function to call when the form submits
  loadingAll = false,  //true while user comments are loading
  postingComment = false, //true while we are sending a comment to the server
}) {
  return (
    <article className="post-card">
      {/*POST CONTENT*/}
      <h2 className="post-title">{post.title}</h2>
      <p className="post-content">{post.content}</p>

      {/*AUTHOR INFO*/}
      <div className="meta">
        <div>
          <b>Author:</b>{" "}
          {/*If user is still loading, show that*/}
          {user ? `${user.name} (${user.email})` : "Loading author…"}
        </div>
        <div>
          <b>Date:</b> {post.date || "—"}
        </div>
      </div>

      {/*COMMENTS SECTION*/}
      <section className="comments">
        <h3>Comments</h3>

        {/*The form calls onAddComment({ name, text }) when submitted */}
        <CommentForm
          onAdd={(payload) => onAddComment && onAddComment(payload)}
          disabled={postingComment}
        />

        {/*Show either loading, empty, or the actual list*/}
        {loadingAll && comments.length === 0 ? (
          <p>Loading comments…</p>
        ) : comments.length === 0 ? (
          <p className="muted">No comments yet. Be the first to comment!</p>
        ) : (
          <ul>
            {comments.map((c) => (
              <li key={c.id} style={{ marginBottom: ".4rem" }}>
                <b>{c.name || "Anonymous"}:</b> {c.body || c.text}
                {/*Label temporary comments*/}
                {c._optimistic ? (
                  <em style={{ marginLeft: 8, color: "var(--muted)" }}>
                    (posting…)
                  </em>
                ) : null}
              </li>
            ))}
          </ul>
        )}
      </section>
    </article>
  );
}
