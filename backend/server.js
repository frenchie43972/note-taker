import express from "express";

const app = express();
const port = 3000;

// global middleware
app.use(express.json());

// mount routes
app.use("/notes", notesRouter);

app.get("/", (req, res) => {
  res.send("Welcome, Everything is Fine!");
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
