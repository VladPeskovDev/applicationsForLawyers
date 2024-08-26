const casesRouter = require('express').Router();
const { Cases, User } = require('../../db/models');
const { verifyAccessToken } = require('../middlewares/verifyTokens');

casesRouter.route('/').get(async (req, res) => {
  try {
    const allLawyer = await Cases.findAll();
    res.json(allLawyer);
  } catch (error) {
    res.status(500).send('Internal server error');
  }
});


module.exports = casesRouter;