import React from "react";

const CommentCard = ({ username, body, created_at }) => {
  const formattedDate = new Date(created_at * 1000);
  const year = formattedDate.getFullYear();
  const months_arr = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const month = months_arr[formattedDate.getMonth()];
  const day = formattedDate.getDate();

  return (
    <section>
      <h3>User: {username}</h3>
      <h4>Date: {`${month} ${day}, ${year}`}</h4>
      <p>{body}</p>
    </section>
  );
};

export default CommentCard;
