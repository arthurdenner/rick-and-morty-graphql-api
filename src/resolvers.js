import axios from 'axios';

const baseURL = 'https://rickandmortyapi.com/api';

const getURL = path => `${baseURL}/${path}`;

const resolvers = {
  Query: {
    character(_, { id }) {
      const url = getURL(`character/${id}`);

      return axios.get(url).then(({ data }) => data);
    },
    episode(_, { id }) {
      const url = getURL(`episode/${id}`);

      return axios.get(url).then(({ data }) => data);
    },
    location(_, { id }) {
      const url = getURL(`location/${id}`);

      return axios.get(url).then(({ data }) => data);
    },
  },
};

export default resolvers;
