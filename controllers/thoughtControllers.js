const { Thought } = require("../models");

module.exports = {
    async getAllThoughts(req, res) {
        try {
            const thoughtData = await Thought.find();
            thoughtData ? res.status(200).json(thoughtData) : res.status(404).json({ message: 'No data found!' });
        } catch (err) {
            console.error(err);
            res.status(500).json(err);
        }
    },

    async getThought(req, res) {
        try {
            const thoughtData = await Thought.findById(req.params.thoughtId);
            thoughtData ? res.status(200).json(thoughtData) : res.status(404).json({ message: 'No data found!' });
        } catch (err) {
            console.error(err);
            res.status(500).json(err);
        }
    },
}