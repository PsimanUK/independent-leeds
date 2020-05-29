import axios from "axios";

export const fetchBusinesses = (params) => {
  console.log(params, "<--- params in api call (before)");
  return axios
    .get(
      "https://bzi4e9gcci.execute-api.eu-west-2.amazonaws.com/beta/independents",
      { params: params }
    )
    .then(({ data }) => {
      console.log(data, "<-- data after api call");
      return data;
    });
};

export const sendUser = (user) => {
  return axios
    .post(
      "https://bzi4e9gcci.execute-api.eu-west-2.amazonaws.com/beta/independents",
      user
    )
    .then((response) => {
      console.log(response, "<-- response after send user");
    });
};

export const fetchBusinessesToVerify = () => {
  return axios
    .get(
      `https://bzi4e9gcci.execute-api.eu-west-2.amazonaws.com/beta/independents?verified=no`
    )
    .then(({ data }) => {
      return data;
    });
};

export const sendBusiness = (username, requestBody) => {
  console.log(
    username,
    "<-- username",
    requestBody,
    "<-- requestBody in sendBusiness api call"
  );
  return axios
    .patch(
      `https://bzi4e9gcci.execute-api.eu-west-2.amazonaws.com/beta/independents/${username}/register_business`,
      requestBody
    )
    .then((response) => {
      console.log(response);
    });
};

export const fetchBusinessByUsername = (username) => {
  return axios
    .get(
      `https://bzi4e9gcci.execute-api.eu-west-2.amazonaws.com/beta/independents/${username}`
    )
    .then((response) => {
      // console.log(response);
      return response.data.Item;
    });
};

export const updateBusiness = (username, requestBody) => {
  console.log(
    username,
    requestBody,
    "<--- username, requestBody in api patch request"
  );
  return axios
    .patch(
      `https://bzi4e9gcci.execute-api.eu-west-2.amazonaws.com/beta/independents/${username}`,
      requestBody
    )
    .then((response) => {
      console.log(response);
    });
};

export const commentPoster = (newComment) => {
  // const { username, body } = newComment;
  console.log(newComment, "-------> comment in api");
  return axios.post(
    `https://bzi4e9gcci.execute-api.eu-west-2.amazonaws.com/beta/independents/${newComment.username}/comments`,
    // {
    newComment
    // }
  );
  // .then((response) => {
  //   console.log(response);
  // });
};

export const deleteCommentByCommentId = (commentId, username) => {
  console.log(username);
  return axios.delete(
    `https://bzi4e9gcci.execute-api.eu-west-2.amazonaws.com/beta/independents/${username}/comments/${commentId}`
  );
};

export const updateVotes = (commentId, username, vote) => {
  return axios.patch(
    `https://bzi4e9gcci.execute-api.eu-west-2.amazonaws.com/beta/independents/${username}/comments/${commentId}/inc_vote`,
    {
      value: vote,
    }
  );
};

export const supportBusinessVoter = (username, vote) => {
  return axios.patch(
    `https://bzi4e9gcci.execute-api.eu-west-2.amazonaws.com/beta/independents/${username}/inc_vote`,
    {
      value: vote,
    }
  );
};
