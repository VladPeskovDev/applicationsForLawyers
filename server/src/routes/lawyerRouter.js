const lawyerRouter = require('express').Router();
const { Lawyer, User } = require('../../db/models');

lawyerRouter.route('/').get(async (req, res) => {
  try {
    const allLawyer = await Lawyer.findAll();
    res.json(allLawyer);
  } catch (error) {
    res.status(500).send('Internal server error');
  }
});

module.exports = lawyerRouter;
