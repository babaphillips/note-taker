const fs = require("fs");
const {
  filterByQuery,
  findById,
  createNewNote,
  validateNote,
} = require("../lib/notes.js");
const { notes } = require("../data/notes");

test("creates a note object", () => {
  const note = createNewNote(
    { title: "Scream", id: "44", text: "Movie" },
    notes
  );

  expect(note.title).toBe("Scream");
  expect(note.id).toBe("44");
  expect(note.text).toBe("Movie");
});

test("filters by query", () => {
  const startingNotes = [
    {
      id: "3",
      title: "Erica",
      text: "gorilla",
    },
    {
      id: "4",
      title: "Noel",
      text: "bear",
    },
  ];

  const updatedNotes = filterByQuery({ text: "gorilla" }, startingNotes);

  expect(updatedNotes.length).toEqual(1);
});

test("finds by id", () => {
  const startingNotes = [
    {
      id: "3",
      title: "Erica",
      text: "gorilla",
    },
    {
      id: "4",
      title: "Noel",
      text: "bear",
    },
  ];

  const result = findById("3", startingNotes);

  expect(result.title).toBe("Erica");
});
