import express from 'express';
import runCpp from '../utils/runCpp.js';

const router = express.Router();

// Example: Get ranked students
router.get('/rank', async (req, res) => {
  try {
    // Example static data (later, fetch from PostgreSQL)
    const students = [
      { name: "Alice", grade: 85, roll: 197 },
      { name: "Bob", grade: 92, roll: 210 },
      { name: "Bob", grade: 100, roll: 215 },
      { name: "Bob", grade: 20, roll: 214 },
      { name: "Bob", grade: 10, roll: 213 },
      { name: "Charlie", grade: 78, roll: 200 }
    ];

    const result = await runCpp('rank_students', students);
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
