import axios from "axios";

export const fetchBusinesses = () => {
  return axios
    .get(
      "https://bzi4e9gcci.execute-api.eu-west-2.amazonaws.com/beta/independents"
    )
    .then(({ data }) => {
      console.log(data, '<-- data in fetchBusinesses')
      return data;
    });
};

export const sendUser = (user) => {
  return axios
    .post("https://bzi4e9gcci.execute-api.eu-west-2.amazonaws.com/beta/independents", user)
    .then((response) => {
      console.log(response, '<-- response after send user')
    })
}

export const fetchBusinessesToVerify = () => {
  return axios
    .get(
      "https://bzi4e9gcci.execute-api.eu-west-2.amazonaws.com/beta/independents",
      { params: { verified: "no" } }
    )
    .then(({ data: { body } }) => {
      return body;
    });
};

export const sendBusiness = (username, requestBody) => {
  console.log(username, '<-- username', requestBody, '<-- requestBody in sendBusiness api call');
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
  return axios
    .patch(
      `https://bzi4e9gcci.execute-api.eu-west-2.amazonaws.com/beta/independents/${username}`,
      requestBody
    )
    .then((response) => {
      console.log(response);
    });
};
