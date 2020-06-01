import axios from "axios";

export const fetchBusinesses = (params) => {
  return axios
    .get(
      "https://bzi4e9gcci.execute-api.eu-west-2.amazonaws.com/beta/independents",
      { params: params }
    )
    .then(({ data }) => {
      return data;
    });
};

export const sendUser = (user) => {
  return axios
    .post(
      "https://bzi4e9gcci.execute-api.eu-west-2.amazonaws.com/beta/independents",
      user
    )
    .then((response) => {});
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
  return axios.patch(
    `https://bzi4e9gcci.execute-api.eu-west-2.amazonaws.com/beta/independents/${username}/register_business`,
    requestBody
  );
};

export const fetchBusinessByUsername = (username) => {
  return axios
    .get(
      `https://bzi4e9gcci.execute-api.eu-west-2.amazonaws.com/beta/independents/${username}`
    )
    .then((response) => {
      return response.data.Item;
    });
};

export const updateBusiness = (username, requestBody) => {
  return axios.patch(
    `https://bzi4e9gcci.execute-api.eu-west-2.amazonaws.com/beta/independents/${username}`,
    requestBody
  );
};

export const commentPoster = (username, newComment) => {
  return axios.post(
    `https://bzi4e9gcci.execute-api.eu-west-2.amazonaws.com/beta/independents/${username}/comments`,
    // {
    newComment
    // }
  );
};

export const deleteCommentByCommentId = (commentId, username) => {
  return axios.delete(
    `https://bzi4e9gcci.execute-api.eu-west-2.amazonaws.com/beta/independents/${username}/comments/${commentId}`
  );
};

export const updateVotes = (commentId, businessUsername, vote) => {
  return axios.patch(
    `https://bzi4e9gcci.execute-api.eu-west-2.amazonaws.com/beta/independents/${businessUsername}/comments/${commentId}/inc_vote`,
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
