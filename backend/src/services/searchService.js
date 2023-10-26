const client = require("../connectors/elasticConnector");

const seachAll = async () => {
  try {
    const response = await client.search({
      index: "search-corpus",
      query: {
        match_all: {},
      },
      size: 1000,
    });
    const hits = response.hits.hits.map((hit) => {
      return {
        ...hit._source,
        score: hit._score,
        highlight: hit.highlight,
      };
    });
    return hits;
  } catch (error) {}
};

const getAllPoets = async () => {
  try {
    const response = await client.search({
      index: "search-corpus",
      aggs: {
        distinct_poet_names: {
          terms: {
            field: "poet",
            size: 100,
          },
        },
      },
      size: 0,
    });

    return response.aggregations.distinct_poet_names.buckets;
  } catch (error) {
    console.log("Error is: ", error);
  }
};

const getAllBooks = async () => {
  try {
    const response = await client.search({
      index: "search-corpus",
      aggs: {
        distinct_books: {
          terms: {
            field: "book",
            size: 100,
          },
        },
      },
      size: 0,
    });

    return response.aggregations.distinct_books.buckets;
  } catch (error) {
    console.log("Error is: ", error);
  }
};

const getBooksForPoets = async (poet) => {
  try {
    const response = await client.search({
      index: "search-corpus",
      query: {
        match: {
          poet: poet,
        },
      },
      aggs: {
        distinct_books: {
          terms: {
            field: "book",
            size: 100,
          },
        },
      },
      size: 0,
    });

    return response.aggregations.distinct_books.buckets;
  } catch (error) {
    console.log("Error is: ", error);
  }
};

const searchForQueryWithDates = async (query, startDate, endDate) => {
  try {
    const response = await client.search({
      index: "search-corpus",
      query: {
        bool: {
          must: [
            {
              range: {
                year: {
                  gte: startDate,
                  lte: endDate,
                },
              },
            },
          ],
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
            {
              match: {
                poet: query,
              },
            },
          ],
        },
      },
      size: 1000,
      highlight: {
        pre_tags: ['<b style="  font-weight: bold;">'],
        post_tags: ["</b>"],
        fields: {
          line: {},
          poem_name: {},
          poet: {},
        },
      },
    });
    const hits = response.hits.hits.map((hit) => {
      return {
        ...hit._source,
        score: hit._score,
        highlight: hit.highlight,
      };
    });
    return hits;
  } catch (error) {}
};

const searchQueryForSound = async (query) => {
  try {
    const response = await client.search({
      index: "search-corpus",
      query: {
        fuzzy: {
          line: query,
        },
      },
      highlight: {
        pre_tags: ['<b style="  font-weight: bold;">'],
        post_tags: ["</b>"],
        fields: {
          line: {},
          poem_name: {},
          poet: {},
        },
      },
      size: 1000,
    });
    const hits = response.hits.hits.map((hit) => {
      return {
        ...hit._source,
        score: hit._score,
        highlight: hit.highlight,
      };
    });
    return hits;
  } catch (error) {
    return [];
  }
};

const searchQueryForSoundWithDates = async (query, startDate, endDate) => {
  console.log(query, startDate, endDate);
  try {
    const response = await client.search({
      index: "search-corpus",
      query: {
        bool: {
          must: [
            {
              fuzzy: {
                line: query,
              },
            },
            {
              range: {
                year: {
                  gte: startDate,
                  lte: endDate,
                },
              },
            },
          ],
        },
      },
      highlight: {
        pre_tags: ['<b style="  font-weight: bold;">'],
        post_tags: ["</b>"],
        fields: {
          line: {},
          poem_name: {},
          poet: {},
        },
      },
      size: 1000,
    });
    console.log(response.hits);
    const hits = response.hits.hits.map((hit) => {
      return {
        ...hit._source,
        score: hit._score,
        highlight: hit.highlight,
      };
    });
    return hits;
  } catch (error) {
    return [];
  }
};

const searchQuery = async (query) => {
  try {
    const response = await client.search({
      index: "search-corpus",
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
            {
              match: {
                poet: query,
              },
            },
          ],
        },
      },
      size: 1000,
      highlight: {
        pre_tags: ['<b style="  font-weight: bold;">'],
        post_tags: ["</b>"],
        fields: {
          line: {},
          poem_name: {},
          poet: {},
        },
      },
    });
    const hits = response.hits.hits.map((hit) => {
      return {
        ...hit._source,
        score: hit._score,
        highlight: hit.highlight,
      };
    });
    return hits;
  } catch (error) {
    return [];
  }
};

const searchForPoet = async (poet) => {
  try {
    const response = await client.search({
      index: "search-corpus",
      query: {
        match: {
          poet: poet,
        },
      },
      size: 1000,
      highlight: {
        pre_tags: ['<b style="  font-weight: bold;">'],
        post_tags: ["</b>"],
        fields: {
          line: {},
          poem_name: {},
          poet: {},
        },
      },
    });
    const hits = response.hits.hits.map((hit) => {
      return {
        ...hit._source,
        score: hit._score,
        highlight: hit.highlight,
      };
    });
    return hits;
  } catch (error) {
    return [];
  }
};

const searchForBook = async (book) => {
  try {
    const response = await client.search({
      index: "search-corpus",
      query: {
        match: {
          book: book,
        },
      },
      size: 1000,
      highlight: {
        pre_tags: ['<b style="  font-weight: bold;">'],
        post_tags: ["</b>"],
        fields: {
          line: {},
          poem_name: {},
          poet: {},
        },
      },
    });
    const hits = response.hits.hits.map((hit) => {
      return {
        ...hit._source,
        score: hit._score,
        highlight: hit.highlight,
      };
    });
    return hits;
  } catch (error) {
    return [];
  }
};

const searchForPoemsWithPoetAndBookAndMetaphor = async (
  poet,
  book,
  metaphor
) => {
  try {
    const response = await client.search({
      index: "search-corpus",
      query: {
        bool: {
          must: [
            {
              match: {
                poet: poet,
              },
            },
            {
              match: {
                book: book,
              },
            },
            {
              match: {
                metaphor_present_or_not: metaphor,
              },
            },
          ],
        },
      },
      size: 1000,
      highlight: {
        pre_tags: ['<b style="  font-weight: bold;">'],
        post_tags: ["</b>"],
        fields: {
          line: {},
          poem_name: {},
          poet: {},
        },
      },
    });
    const hits = response.hits.hits.map((hit) => {
      return {
        ...hit._source,
        score: hit._score,
        highlight: hit.highlight,
      };
    });
    return hits;
  } catch (error) {}
};

const searchForPoemsWithPoetAndBook = async (poet, book, metaphor) => {
  try {
    const response = await client.search({
      index: "search-corpus",
      query: {
        bool: {
          must: [
            {
              match: {
                poet: poet,
              },
            },
            {
              match: {
                book: book,
              },
            },
          ],
        },
      },
      size: 1000,
      highlight: {
        pre_tags: ['<b style="  font-weight: bold;">'],
        post_tags: ["</b>"],
        fields: {
          line: {},
          poem_name: {},
          poet: {},
        },
      },
    });
    const hits = response.hits.hits.map((hit) => {
      return {
        ...hit._source,
        score: hit._score,
        highlight: hit.highlight,
      };
    });
    return hits;
  } catch (error) {}
};

module.exports = {
  searchQuery,
  searchQueryForSound,
  seachAll,
  searchForQueryWithDates,
  searchQueryForSoundWithDates,
  getAllPoets,
  searchForPoet,
  getAllBooks,
  searchForBook,
  getBooksForPoets,
  searchForPoemsWithPoetAndBookAndMetaphor,
  searchForPoemsWithPoetAndBook,
};
