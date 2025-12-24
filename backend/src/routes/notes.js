const express = require('express');
const router = express.Router();

// GET /notes
router.get('/', (req, res) => {
  res.json([]);
});

// GET /notes/count
router.get('/count', (req, res) => {
  res.json({
    count: 0,
  });
});

module.exports = router;
