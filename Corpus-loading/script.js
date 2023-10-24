const fs = require("fs");
const csv = require("csv-parser");

const inputFile = "corpus.csv";
const outputFile = "corpus-file.json";

const outputStream = fs.createWriteStream(outputFile);

outputStream.write('{"index": {"_index": "search-corpus"}}\n');

fs.createReadStream(inputFile)
  .pipe(csv())
  .on("data", (row) => {
    const jsonEntry = {
      poem_name: row["Poem Name"],
      poet: row.Poet,
      line: row.Line,
      metaphor_present_or_not: row["Metaphor present or not"],
      metaphor_count: row["Count of the metaphor"],
      metaphorical_terms: row["Metaphorical terms"],
      book: row.Book,
      year: row.Year,
    };

    outputStream.write(JSON.stringify(jsonEntry) + "\n");
    outputStream.write('{"index": {"_index": "search-corpus"}}\n');
  })
  .on("end", () => {
    outputStream.end();
    console.log(`JSON data has been written to ${outputFile}`);
  });
