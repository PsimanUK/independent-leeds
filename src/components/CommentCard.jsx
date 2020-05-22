import React from "react";

const CommentCard = ({ username, body, created_at }) => {
  return (
    <section>
      <h3>{username}</h3>
      <h4>{created_at}</h4>
      <p>{body}</p>
    </section>
  );
};

export default CommentCard;
