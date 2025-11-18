import React from "react";
import CommentForm from "./CommentForm.jsx";
import { useAuth } from "../context/AuthContext";

export default function PostCard({
  post,
  user,               
  comments = [],       
  onAddComment,        
  loadingAll = false,  
  postingComment = false, 
}) {
  //check if the user is logged in, using our auth context
  const { isAuthenticated } = useAuth();

  return (
    <article className="post-card">
      {/* POST CONTENT */}
      <h2 className="post-title">{post.title}</h2>
      <p className="post-content">{post.content}</p>

      {/* AUTHOR INFO */}
      <div className="meta">
        <div>
          <b>Author:</b>{" "}
          {/* If user is still loading */}
          {user ? `${user.name} (${user.email})` : "Loading author…"}
        </div>
        <div>
          <b>Date:</b> {post.date || "—"}
        </div>
      </div>

      {/* COMMENTS SECTION */}
      <section className="comments">
        <h3>Comments</h3>

        {}
        {isAuthenticated ? (
          <CommentForm
            onAdd={(payload) => onAddComment && onAddComment(payload)}
            disabled={postingComment}
          />
        ) : (
          <p className="muted">
            You must be logged in to write a comment. Use the Login button at
            the top of the page.
          </p>
        )}

        {/* Show either loading, empty, or the actual list */}
        {loadingAll && comments.length === 0 ? (
          <p>Loading comments…</p>
        ) : comments.length === 0 ? (
          <p className="muted">No comments yet. Be the first to comment!</p>
        ) : (
          <ul>
            {comments.map((c) => (
              <li key={c.id} style={{ marginBottom: ".4rem" }}>
                <b>{c.name || "Anonymous"}:</b> {c.body || c.text}
                {/* Label temporary comments */}
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
