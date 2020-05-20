import axios from 'axios';

export const fetchBusinesses = () => {
    return axios.get('https://j5qz3dnbs3.execute-api.eu-west-2.amazonaws.com/v1/newindependent')
        .then(({ body }) => {
            console.log(body, '<-- response from fetchBusinesses')
            return body;
        })
};

export const basicGet = () => {
    return axios.get('https://j-dublon-nc-news.herokuapp.com/api/articles')
        .then(({ data }) => {
            console.log(data, '<-- response from basic get');
            return data;
        })
}

// https://j-dublon-nc-news.herokuapp.com/api/articles

// https://j5qz3dnbs3.execute-api.eu-west-2.amazonaws.com/v1/newindependent