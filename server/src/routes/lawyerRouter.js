const lawyerRouter = require('express').Router();
const { Lawyer, User } = require('../../db/models');
const { verifyAccessToken } = require('../middlewares/verifyTokens');

lawyerRouter.route('/').get(async (req, res) => {
  try {
    const allLawyer = await Lawyer.findAll();
    res.json(allLawyer);
  } catch (error) {
    res.status(500).send('Internal server error');
  }
});

lawyerRouter
  .route('/')
  .post(verifyAccessToken, async (req, res) => {
    try {
      const userId = res.locals.user.id;
      if (userId !== 2) {
        return res.status(403).json({ error: 'You are not authorized to create lawyer posts.' });
      }
// Создание карточки адвоката
      const post = await Lawyer.create({
        name: req.body.name,
        education: req.body.education,
        description: req.body.description,
        userId,
        photo: req.body.photo,
        phone: req.body.phone,
        telegram: req.body.telegram,
      });

      const plainX = await Lawyer.findOne({
        where: {
          id: post.id,
        },
        include: {
          model: User,
          as: 'admin',
          attributes: ['id', 'username', 'email'],
        },
      });

      res.json(plainX);
    } catch (err) {
      console.error(err);
      res.status(500).send('Internal server error');
    }
  });



module.exports = lawyerRouter;
