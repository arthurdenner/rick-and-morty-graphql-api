const axios = require('axios');

const baseURL = 'https://rickandmortyapi.com/api';

const getFilters = filters => filters.map(([k, v]) => `${k}=${v}`).join('&');
const getId = url => (url ? url.replace(/[^0-9]/g, '') : null);
const getURL = (path, args = {}) => {
  let url = `${baseURL}/${path}`;

  const filters = Object.entries(args);

  if (filters.length) {
    const queries = getFilters(filters);
    url += `?${queries}`;
  }

  return url;
};

const resolvers = {
  Query: {
    character(_, { id }) {
      const url = getURL(`character/${id}`);

      return axios.get(url).then(({ data }) => data);
    },
    characters(_, args) {
      const url = getURL('character/', args);

      return axios.get(url).then(({ data }) => data);
    },
    episode(_, { id }) {
      const url = getURL(`episode/${id}`);

      return axios.get(url).then(({ data }) => data);
    },
    episodes(_, args) {
      const url = getURL('episode/', args);

      return axios.get(url).then(({ data }) => data);
    },
    location(_, { id }) {
      const url = getURL(`location/${id}`);

      return axios.get(url).then(({ data }) => data);
    },
    locations(_, args) {
      const url = getURL('location/', args);

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
  Location: {
    residents({ residents }) {
      const urls = residents.map(url =>
        axios.get(url).then(({ data }) => data)
      );

      return axios.all(urls).then(axios.spread((...resids) => resids));
    },
  },
  Information: {
    next({ next }) {
      return getId(next);
    },
    prev({ prev }) {
      return getId(prev);
    },
  },
};

module.exports = resolvers;
