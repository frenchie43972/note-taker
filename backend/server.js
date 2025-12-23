const express = require("express");

const app = express();

app.get("/notes", (req, res) => {
  res.json([]);
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
