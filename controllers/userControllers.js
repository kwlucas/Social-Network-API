const { User, Thought } = require("../models");

module.exports = {
    async getAllUsers(req, res) {
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
    },

    async createUser(req, res) {
        try {
            const userData = await User.create(req.body);
            res.status(200).json(userData);
        } catch (err) {
            console.error(err);
            res.status(500).json(err);
        }
    },

    async updateUser(req, res) {
        try {
            const userData = await User.findByIdAndUpdate(req.params.userId, req.body);
            res.status(200).json(userData);
        } catch (err) {
            console.error(err);
            res.status(500).json(err);
        }
    },

    async deleteUser(req, res) {
        try {
            const userData = await User.findByIdAndDelete(req.params.userId);
            res.status(200).json(userData);
        } catch (err) {
            console.error(err);
            res.status(500).json(err);
        }
    },

    async addFriend(req, res) {
        try {
            //Add the new friend's id to the user's firend list
            const userData = await User.findByIdAndUpdate(req.params.userId, { $addToSet: { friends: req.params.friendId } });
            //Add the user's id to the new friend's friend list
            const friendData = await User.findByIdAndUpdate(req.params.friendId, { $addToSet: { friends: req.params.userId } });
            res.status(200).json(userData, friendData);
        } catch (err) {
            console.error(err);
            res.status(500).json(err);
        }
    },

    async removeFriend(req, res) {
        try {
            //Remove the friend's id from the user's firend list
            const userData = await User.findByIdAndUpdate(req.params.userId, { $addToSet: { friends: req.params.friendId } });
            //Remove the user's id from the friend's friend list
            const friendData = await User.findByIdAndUpdate(req.params.friendId, { $pullAll: { friends: [req.params.userId] } });
            res.status(200).json(userData, friendData);
        } catch (err) {
            console.error(err);
            res.status(500).json(err);
        }
    }
}