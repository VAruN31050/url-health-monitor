// Basic Express server setup
const express = require('express');
const cors = require('cors');
const axios = require('axios');
const { logUrlCheck, db } = require('./db');
const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('URL Health Monitor backend is running!');
});

// POST /check-urls endpoint
app.post('/check-urls', async (req, res) => {
  const { urls } = req.body;
  if (!Array.isArray(urls)) {
    return res.status(400).json({ error: 'urls must be an array' });
  }

  const results = await Promise.all(urls.map(async (url) => {
    const start = Date.now();
    let status = 'DOWN';
    let responseTime = null;
    let checkedAt = new Date().toISOString();
    try {
      const response = await axios.get(url, { timeout: 5000 });
      responseTime = Date.now() - start;
      if (response.status >= 200 && response.status < 400) {
        status = 'UP';
      }
    } catch (err) {
      responseTime = Date.now() - start;
      status = 'DOWN';
    }
    // Log to SQLite
    logUrlCheck({ url, status, responseTime, checkedAt });
    return {
      url,
      status,
      responseTime,
      checkedAt,
    };
  }));

  res.json(results);
});

// GET /history/:url endpoint
app.get('/history/:url', (req, res) => {
  // URL may be encoded, so decode it
  const url = decodeURIComponent(req.params.url);
  db.all(
    `SELECT status, responseTime, checkedAt FROM url_checks WHERE url = ? ORDER BY checkedAt ASC`,
    [url],
    (err, rows) => {
      if (err) {
        return res.status(500).json({ error: 'Database error' });
      }
      res.json(rows);
    }
  );
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
