import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import PostCard from "../components/PostCard.jsx";

export default function IndividualPostPage() {
  //Read the id part from the URL
  const { id } = useParams();

  //Store the post
  const [post, setPost] = useState(null);
  const [user, setUser] = useState(null);
  const [comments, setComments] = useState([]);

  //shows errors if any
  const [loadingPost, setLoadingPost] = useState(true);
  const [loadingUser, setLoadingUser] = useState(false);
  const [loadingComments, setLoadingComments] = useState(false);
  const [postingComment, setPostingComment] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  
  useEffect(() => {
    async function loadPostAndExtras() {
      try {
        setErrorMsg("");
        setLoadingPost(true);

        //Get the single post by its id
        const postRes = await fetch(
          `https://jsonplaceholder.typicode.com/posts/${id}`
        );
        if (!postRes.ok) throw new Error("Post not found");
        const postData = await postRes.json();
        setPost(postData);
        setLoadingPost(false);

        //fetch
        if (postData?.userId) {
          setLoadingUser(true);
          const userRes = await fetch(
            `https://jsonplaceholder.typicode.com/users/${postData.userId}`
          );
          //if this fails then there will just be not author listed
          if (userRes.ok) {
            const userData = await userRes.json();
            setUser(userData);
          }
          setLoadingUser(false);
        }

        //fetch
        setLoadingComments(true);
        const commentsRes = await fetch(
          `https://jsonplaceholder.typicode.com/posts/${id}/comments`
        );
        if (commentsRes.ok) {
          const commentsData = await commentsRes.json();
          setComments(commentsData || []);
        }
        setLoadingComments(false);
      } catch (err) {
        setErrorMsg(err.message || "Failed to load the post.");
        setLoadingPost(false);
        setLoadingUser(false);
        setLoadingComments(false);
      }
    }

    loadPostAndExtras();
  }, [id]);

  async function handleAddComment({ name, text }) {
    //cant submit something blank
    if (!name?.trim() || !text?.trim()) return;

     const temp = {
      id: Date.now(),
      postId: Number(id),
      name: name.trim(),
      email: "example@nowhere.com",
      body: text.trim(),
      _optimistic: true,
    };
    setComments((prev) => [temp, ...prev]);


    try {
      setPostingComment(true);
      //Send the new comment to the API
      const res = await fetch(
        `https://jsonplaceholder.typicode.com/posts/${id}/comments`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            postId: Number(id),
            name: temp.name,
            email: temp.email,
            body: temp.body,
          }),
        }
      );

      const created = await res.json();

      //Replace the temporary comment
      setComments((prev) => {
        const withoutTemp = prev.filter((c) => !c._optimistic);
        return [created, ...withoutTemp];
      });
    } catch {
      //If something went wrong, remove the temporary comment
      setComments((prev) => prev.filter((c) => !c._optimistic));
      alert("Could not post your comment. Please try again.");
    } finally {
      setPostingComment(false);
    }
  }

  if (loadingPost) return <p>Loading post…</p>;
  if (errorMsg) return <p style={{ color: "crimson" }}>{errorMsg}</p>;
  if (!post) return <p>Post not found!</p>;

  return (
    <PostCard
      post={{
        title: post.title,
        content: post.body,
        date: "—",
      }}
      user={user}
      comments={comments}
      onAddComment={handleAddComment}
      loadingAll={loadingUser || loadingComments}
      postingComment={postingComment}
    />
  );
}
