> ⚠️ NOT FINISHED (BUT USABLE) ⚠️

# The Rick and Morty GraphQL API

This is a GraphQL wrapper over the [Rick and Morty API](https://github.com/afuh/rick-and-morty-api), which is based on the television show [Rick and Morty](https://www.adultswim.com/videos/rick-and-morty). Using it, you will access to data about hundreds of characters, images, locations and episodes.

**To get started, you can jump right to [GraphiQL](https://rickandmortyapi-gql-gwkrokyifc.now.sh/) to see the docs and write some queries.**

This wrapper exposes _almost_ the same data as the REST API, including the `info` property on the response for various characters, episodes or locations.

## Run the API locally

This wrapper makes use of [Apollo Engine](http://engine.apollographql.com/), so you need to get the an API key and create a `now-secrets.json` file with the following code:

```
{
  "@engine-api-key": "YOUR_API_KEY"
}
```
