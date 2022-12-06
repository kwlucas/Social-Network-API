const { User, Thought } = require("../models");

module.exports = {
    async getUsers(req, res) {
        try {
            const userData = await User.find();
            userData ? res.status(200).json(userData) : res.status(404).json({ message: 'No data found!' });
        } catch (err) {
            console.error(err);
            res.status(500).json(err);
        }
    },

    async getUser(req, res) {
        try {
            const userData = await User.findById(req.params.userId).populate('thoughts').populate('friends');
            userData ? res.status(200).json(userData) : res.status(404).json({ message: 'No data found!' });
        } catch (err) {
            console.error(err);
            res.status(500).json(err);
        }
    }
}