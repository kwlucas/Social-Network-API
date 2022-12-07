const { Thought, User } = require("../models");

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

    async createThought(req, res) {
        try {
            const { thoughtText, username, userId } = req.body;
            const thoughtData = await Thought.create({ thoughtText, username });
            const userData = await User.findByIdAndUpdate(userId, { $addToSet: { thoughts: thoughtData._id } });
            res.status(200).json(thoughtData, userData);
        } catch (err) {
            console.error(err);
            res.status(500).json(err);
        }
    },

    async updateThought(req, res) {
        try {
            const thoughtData = await Thought.findByIdAndUpdate(req.params.thoughtId, req.body);
            res.status(200).json(thoughtData);
        } catch (err) {
            console.error(err);
            res.status(500).json(err);
        }
    },
}