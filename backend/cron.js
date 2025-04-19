// Cron job to check all unique URLs every 30 minutes and log results
const axios = require('axios');
const { db, logUrlCheck } = require('./db');

async function checkAllUrls() {
  db.all('SELECT DISTINCT url FROM url_checks', [], async (err, rows) => {
    if (err) {
      console.error('Error fetching URLs for cron job:', err);
      return;
    }
    const urls = rows.map(row => row.url);
    for (const url of urls) {
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
      logUrlCheck({ url, status, responseTime, checkedAt });
      console.log(`[CRON] Checked ${url}: ${status} (${responseTime} ms)`);
    }
  });
}

// Run every 30 minutes
setInterval(checkAllUrls, 30 * 60 * 1000);

// Also run immediately on start
checkAllUrls();
