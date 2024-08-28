const casesRouter = require('express').Router();
const { Cases, User } = require('../../db/models');
const { verifyAccessToken } = require('../middlewares/verifyTokens');

casesRouter.route('/').get(async (req, res) => {
  try {
    const allCases = await Cases.findAll();
    res.json(allCases);
  } catch (error) {
    res.status(500).send('Internal server error');
  }
});


casesRouter.route('/').post(verifyAccessToken, async (req, res) => {
  try {
    const userId = res.locals.user.id;
    if (userId !== 2) {
      return res.status(403).json({ error: 'You are not authorized to create cases.' });
}

    const post = await Cases.create({
      title: req.body.title,
      description: req.body.description,
      userID: userId, 
      photo1: req.body.photo1,
      photo2: req.body.photo2,
      photo3: req.body.photo3,
      photo4: req.body.photo4,
      photo5: req.body.photo5,
    });
    res.json(post);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

casesRouter.route('/:id').delete(verifyAccessToken, async (req, res) => {
  const { id } = req.params;
  if (Number.isNaN(+id)) {
    return res.status(400).json({ message: 'Id must be a number' });
  }
  try {
    const CasesDelete = await Cases.findByPk(req.params.id);
    if (!CasesDelete) {
      return res.status(404).json({ message: 'Cases not found' });
    }
    const userId = res.locals.user.id;
    if (userId !== 2) {
      return res.status(401).json({ message: 'Unable to complete' });
    }
    await CasesDelete.destroy();
    res.json({ message: 'Cases deleted' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = casesRouter;