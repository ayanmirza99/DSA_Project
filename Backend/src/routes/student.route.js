import express from 'express';
import runCpp from '../utils/runCpp.js';

const router = express.Router();

// Example: Get ranked students
router.get('/rank', async (req, res) => {
  try {
    // Example static data (later, fetch from PostgreSQL)
    const students = [
      { name: "Alice", grade: 85 },
      { name: "Bob", grade: 92 },
      { name: "Charlie", grade: 78 }
    ];

    const result = await runCpp('rank_students', students);
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
