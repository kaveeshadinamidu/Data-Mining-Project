import client from "./client";

const searchAll = async () => {
  try {
    const { data } = await client.get("/search/all");
    return Promise.resolve(data);
  } catch (error) {
    return Promise.reject(error);
  }
};

const searchQuery = async (query) => {
  try {
    const { data } = await client.get("/search", { params: { q: query } });
    return Promise.resolve(data);
  } catch (error) {
    return Promise.reject(error);
  }
};

const searchSoundQuery = async (query) => {
  try {
    const { data } = await client.get("/search/sound", {
      params: { q: query },
    });
    return Promise.resolve(data);
  } catch (error) {
    return Promise.reject(error);
  }
};

const searchQueryWithDates = async (query, startDate, endDate, type) => {
  try {
    const { data } = await client.get("/search", {
      params: { q: query, startDate: startDate, endDate: endDate, type: type },
    });
    return Promise.resolve(data);
  } catch (error) {
    return Promise.reject(error);
  }
};

const searchAllPoets = async () => {
  try {
    const { data } = await client.get("/search/poet");
    return Promise.resolve(data);
  } catch (error) {
    return Promise.reject(error);
  }
};

const searchForPoet = async (poet) => {
  try {
    const { data } = await client.get(`/search/poet/${poet}`);
    return Promise.resolve(data);
  } catch (error) {
    return Promise.reject(error);
  }
};

const getBooksForPoet = async (poet) => {
  try {
    const { data } = await client.get(`/search/poet/${poet}/book`);
    return Promise.resolve(data);
  } catch (error) {
    return Promise.reject(error);
  }
};

const searchAllBooks = async () => {
  try {
    const { data } = await client.get("/search/book");
    return Promise.resolve(data);
  } catch (error) {
    return Promise.reject(error);
  }
};

const searchForBook = async (book) => {
  try {
    const { data } = await client.get(`/search/book/${book}`);
    return Promise.resolve(data);
  } catch (error) {
    return Promise.reject(error);
  }
};

const findWithAllParams = async (poet, book, metaphor) => {
  try {
    const { data } = await client.get("/search/find", {
      params: {
        poet: poet,
        book: book,
        metaphor: metaphor,
      },
    });
    return Promise.resolve(data);
  } catch (error) {
    return Promise.reject(error);
  }
};

export default {
  searchQuery,
  searchSoundQuery,
  searchQueryWithDates,
  searchAll,
  searchAllPoets,
  searchForPoet,
  searchAllBooks,
  searchForBook,
  getBooksForPoet,
  findWithAllParams,
};
