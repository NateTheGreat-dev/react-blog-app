import React, { useState } from "react";

export default function CommentForm({ onAdd, disabled = false }) {
  //Keep what the user types in local state
  const [name, setName] = useState("");
  const [text, setText] = useState("");

  //When the user submits the form, send the data up to the parent
  function handleSubmit(e) {
    e.preventDefault(); //stop the page from reloading
    const cleanName = name.trim();
    const cleanText = text.trim();

    //cant have empty fields
    if (!cleanName || !cleanText) return;

    //Call the parent's function with the name and text
    onAdd?.({ name: cleanName, text: cleanText });

    //Clear the inputs
    setName("");
    setText("");
  }

  return (
    <form className="form-stack comment-form" onSubmit={handleSubmit}>
      <input
        className="comment-input"
        value={name}
        onChange={(e) => setName(e.target.value)}
        type="text"
        placeholder="Your name"
        disabled={disabled}
      />
      <input
        className="comment-input"
        value={text}
        onChange={(e) => setText(e.target.value)}
        type="text"
        placeholder="Add a comment"
        disabled={disabled}
      />
      <button className="btn" type="submit" disabled={disabled}>
        {disabled ? "Posting…" : "Submit"}
      </button>
    </form>
  );
}
