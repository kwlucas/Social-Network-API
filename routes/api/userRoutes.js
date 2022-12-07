const router = require("express").Router();

const {getAllUsers, getUser, createUser, updateUser, deleteUser, addFriend, removeFriend} = require('../../controllers/userControllers');

router.route('/').get(getAllUsers);
router.route('/').post(createUser);
router.route('/:userId').get(getUser);
router.route('/:userId').put(updateUser);
router.route('/:userId').delete(deleteUser);
router.route('/:userId/firends/:friendId').post(addFriend);
router.route('/:userId/firends/:friendId').delete(removeFriend);

module.exports = router;