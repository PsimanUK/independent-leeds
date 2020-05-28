import axios from "axios";

export const fetchBusinesses = (params) => {
  console.log(params, "<--- params in api call (before)")
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
      console.log(response);
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
