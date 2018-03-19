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
  Character: {
    episodes({ episode }) {
      const urls = episode.map(url => axios.get(url).then(({ data }) => data));

      return axios.all(urls).then(axios.spread((...episodes) => episodes));
    },
    location({ location }) {
      // if the location is 'unknown', we can't query anything
      if (!location.url) {
        return location;
      }

      return axios.get(location.url).then(({ data }) => data);
    },
    origin({ origin }) {
      // same as the location
      if (!origin.url) {
        return origin;
      }

      return axios.get(origin.url).then(({ data }) => data);
    },
  },
  Episode: {
    characters({ characters }) {
      const urls = characters.map(url =>
        axios.get(url).then(({ data }) => data)
      );

      return axios.all(urls).then(axios.spread((...chars) => chars));
    },
  },
};

export default resolvers;
