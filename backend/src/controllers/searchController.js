const exress = require("express");

const searchService = require("../services/searchService");

const router = exress.Router();

router.get("", async (req, res) => {
  const q = req.query.q;
  const startDate = req.query.startDate;
  const endDate = req.query.endDate;
  const type = req.query.type;
  if (type === "text" && startDate && endDate) {
    const response = await searchService.searchForQueryWithDates(
      q,
      startDate,
      endDate
    );
    res.status(200).send(response);
    return;
  } else if (type === "sound" && startDate && endDate) {
    const response = await searchService.searchQueryForSoundWithDates(
      q,
      startDate,
      endDate
    );
    res.status(200).send(response);
    return;
  } else if (type === "sound") {
    const response = await searchService.searchQueryForSound(q);
    res.status(200).send(response);
    return;
  }
  const response = await searchService.searchQuery(req.query.q);
  res.status(200).send(response);
});

router.get("/sound", async (req, res) => {
  const response = await searchService.searchQueryForSound(req.query.q);
  res.status(200).send(response);
});

router.get("/all", async (req, res) => {
  const response = await searchService.seachAll();
  res.status(200).send(response);
});

router.get("/poet", async (req, res) => {
  const response = await searchService.getAllPoets();
  res.status(200).send(response);
});

router.get("/poet/:poet", async (req, res) => {
  const response = await searchService.searchForPoet(req.params.poet);
  res.status(200).send(response);
});

router.get("/poet/:poet/book", async (req, res) => {
  const response = await searchService.getBooksForPoets(req.params.poet);
  res.status(200).send(response);
});

router.get("/book", async (req, res) => {
  const response = await searchService.getAllBooks();
  res.status(200).send(response);
});

router.get("/book/:book", async (req, res) => {
  const response = await searchService.searchForBook(req.params.book);
  res.status(200).send(response);
});

router.get("/find", async (req, res) => {
  const poet = req.query.poet;
  const book = req.query.book;
  const metaphor = req.query.metaphor;
  if (metaphor) {
    const response =
      await searchService.searchForPoemsWithPoetAndBookAndMetaphor(
        poet,
        book,
        metaphor
      );
    res.status(200).send(response);
  } else {
    const response = await searchService.searchForPoemsWithPoetAndBook(
      poet,
      book
    );
    res.status(200).send(response);
  }
});

module.exports = router;
