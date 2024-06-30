const express = require('express');

const {
    getLogs,
    getLog,
    createLog,
    updateLog,
    deleteLog
} = require('../controllers/logController');
const router = express.Router();

// GET all logs
router.get('/', getLogs);

// GET a single log
router.get('/:id', getLog);

// POST a log
router.post('/', createLog);

// PUT a log (update)
router.put('/:id', updateLog);

// DELETE a log
router.delete('/:id', deleteLog);

module.exports = router;