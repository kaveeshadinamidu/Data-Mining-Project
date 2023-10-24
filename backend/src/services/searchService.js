const client = require("../connectors/elasticConnector");

const searchQuery = async (query) => {
  try {
    const response = await client.search({
      index: "search-corpus",
      body: {
        query: {
          bool: {
            should: [
              {
                match: {
                  line: query,
                },
              },
              {
                match: {
                  poem_name: query,
                },
              },
            ],
          },
        },
      },
    });
    const hits = response.hits.hits.map((hit) => {
      return {
        ...hit._source,
        score: hit._score,
      };
    });
    return hits;
  } catch (error) {
    return [];
  }
};

module.exports = {
  searchQuery,
};
