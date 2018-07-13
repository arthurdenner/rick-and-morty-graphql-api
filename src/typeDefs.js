const { gql } = require('apollo-server');

const typeDefs = gql`
  type Query {
    character(id: Int!): Character
    characters(
      page: Int
      name: String
      status: String
      species: String
      type: String
      gender: String
    ): Characters
    episode(id: Int!): Episode
    episodes(page: Int, name: String, episode: String): Episodes
    location(id: Int!): Location
    locations(
      page: Int
      name: String
      type: String
      dimension: String
    ): Locations
  }

  type Character {
    id: Int
    name: String
    species: String
    type: String
    status: String
    location: Location
    origin: Location
    gender: String
    episodes: [Episode]
    image: String
  }

  type Characters {
    info: Information
    results: [Character]
  }

  type Episode {
    id: Int
    name: String
    episode: String
    air_date: String
    characters: [Character]
  }

  type Episodes {
    info: Information
    results: [Episode]
  }

  type Location {
    id: Int
    name: String
    type: String
    dimension: String
    residents: [Character]
  }

  type Locations {
    info: Information
    results: [Location]
  }

  type Information {
    count: Int
    pages: Int
    next: Int
    prev: Int
  }
`;

module.exports = typeDefs;
