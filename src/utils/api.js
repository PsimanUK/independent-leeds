import axios from "axios";

export const fetchBusinesses = () => {
  return axios
    .get(
      "https://j5qz3dnbs3.execute-api.eu-west-2.amazonaws.com/v1/newindependent"
    )
    .then(({ data: { body } }) => {
      return body;
    });
};

export const fetchBusinessesToVerify = () => {
  return axios
    .get(
      "https://j5qz3dnbs3.execute-api.eu-west-2.amazonaws.com/v1/newindependent",
      { params: { verified: "no" } }
    )
    .then(({ data: { body } }) => {
      return body;
    });
};

export const sendBusiness = (requestBody) => {
  console.log(requestBody);
  return axios
    .patch(
      "https://j5qz3dnbs3.execute-api.eu-west-2.amazonaws.com/v1/newindependent",
      requestBody
    )
    .then((response) => {
      console.log(response);
    });
};

export const fetchBusinessById = (id) => {
  return axios
    .get(
      `https://j5qz3dnbs3.execute-api.eu-west-2.amazonaws.com/v1/newindependent/${id}`
    )
    .then((response) => {
      console.log(response);
      return response.data.Item;
    });
};

export const updateBusinessById = (id, requestBody) => {
  return axios
    .patch(
      `https://j5qz3dnbs3.execute-api.eu-west-2.amazonaws.com/v1/newindependent/${id}`,
      requestBody
    )
    .then((response) => {
      console.log(response);
    });
};
