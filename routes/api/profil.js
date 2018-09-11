const express = require('express');
const router = express.Router();

// @route   GET api/profil/test
// @dsc     Test profil route
// @access  Private
router.get('/test', (req, res) => res.json({msg: "Profil Works"}));

module.exports = router;