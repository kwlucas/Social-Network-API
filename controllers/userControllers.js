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
    }
}