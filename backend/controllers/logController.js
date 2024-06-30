const Log = require('../models/logModel');

// get all logs
const getLogs = async (req, res) => {
    try {
        const logs = await Log.find();
        res.status(200).send(logs);
    } catch (error) {
        console.error('Error fetching logs:', error);
        res.status(500).send('Internal Server Error');
    }
}

// get a single log
const getLog = async (req, res) => {
    const { id } = req.params;
    const log = await Log.findById(id);

    if (!log) {
        return res.status(404).json({error: 'No such log'});
    }
    
    res.status(200).json(log);
}

// create a new log
const createLog = async (req, res) => {
    try {
        const log = new Log({
            date: req.body.date,
            latitude: req.body.latitude,
            longitude: req.body.longitude,
            name: req.body.name, 
            species: req.body.species
        });
        await log.save();
        res.status(201).send(log);
    } catch (error) {
        console.error('Error creating course: ', error);
        res.status(400).send('Error creating course');
    }
}

// update a log
const updateLog = async (req, res) => {
    try {
        const log = await Log.findByIdAndUpdate(req.params.id, {
            date: req.body.date,
            latitude: req.body.latitude,
            longitude: req.body.longitude,
            name: req.body.name,
            species: req.body.species
        }, { new: true });

        if (!log) return res.status(404).send('The log was not found. :(');

        res.send(log);
    } catch (error) {
        console.error('Error updating course: ', error);
        res.status(500).send('Internal Server Error');
    }
}

// delete a log
const deleteLog = async (req, res) => {
    try {
        const log = await Log.findByIdAndDelete(req.params.id);
        if (!log) return res.status(404).send('The log was not found. :(');
        res.send(log);
    } catch (error) {
        console.error('Error deleting course: ', error);
        res.status(500).send('Internal Server Error');
    }
}

module.exports = {
    getLogs,
    getLog,
    createLog,
    updateLog,
    deleteLog
};