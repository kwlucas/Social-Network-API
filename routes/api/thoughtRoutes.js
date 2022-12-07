const router = require("express").Router();

const {getAllThoughts, getThought, createThought, updateThought, deleteThought} = require('../../controllers/thoughtControllers');

router.route('/').get(getAllThoughts);
router.route('/').post(createThought);
router.route('/:thoughtId').get(getThought);
router.route('/:thoughtId').put(updateThought);
router.route('/:thoughtId').delete(deleteThought);

module.exports = router;