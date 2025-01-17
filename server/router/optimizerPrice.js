const express = require('express');
const { exec } = require('child_process');
const path = require('path');
const router = express.Router();

// Endpoint for price optimization
router.post('/optimize-price', async (req, res) => {
  try {
    const scriptPath = path.join(__dirname, '../algorithm/Price_Optimization.ipynb');
    const datasetPath = path.join(__dirname, '../algorithm/dataset_new.csv');

    // Execute the Python script
    exec(`python3 ${scriptPath} ${datasetPath}`, (error, stdout, stderr) => {
      if (error) {
        console.error(`Error: ${stderr}`);
        return res.status(500).json({ error: 'Price optimization failed.' });
      }
      res.status(200).json({ message: 'Price optimized successfully', result: JSON.parse(stdout) });
    });
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});

module.exports = router;
