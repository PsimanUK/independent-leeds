import React from "react";
import CommentVoter from "./CommentVoter";

const CommentCard = (props) => {
  // const formattedDate = new Date(created_at * 1000);
  // const year = formattedDate.getFullYear();
  // const months_arr = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  // const month = months_arr[formattedDate.getMonth()];
  // const day = formattedDate.getDate();
  // {`${month} ${day}, ${year}`}
  // console.log(props);
  const { username, body, createdAt, commentId, votes } = props.comment;

  const { deleteComment } = props;

  const handleClick = (event) => {
    deleteComment(event.target.value);
  };

  // console.log(props.username);
  return (
    <section>
      <h3>User: {username}</h3>
      <h4>Date: {createdAt}</h4>
      <p>Body: {body}</p>
      <div>
        <CommentVoter commentId={commentId} username={username} votes={votes} />
      </div>
      {username === props.username ? (
        <button onClick={handleClick} value={commentId}>
          Delete comment
        </button>
      ) : null}
    </section>
  );
};

export default CommentCard;
