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

  lawyerRouter.route('/:id').delete(verifyAccessToken, async (req, res) => {
    const { id } = req.params;
    if (Number.isNaN(+id)) {
      return res.status(400).json({ message: 'Id must be a number' });
    }
    try {
      const LawyerDelete = await Lawyer.findByPk(req.params.id);
      if (!LawyerDelete) {
        return res.status(404).json({ message: 'Lawyer not found' });
      }
      if (res.locals.user.id !== 2) {
        return res.status(401).json({ message: 'Unable to complete' });
      }
      await LawyerDelete.destroy();
      res.json({ message: 'Lawyer deleted' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error' });
    }
  });

  lawyerRouter.route('/:id').patch(verifyAccessToken, async (req, res) => {
    const { id } = req.params;
    const { name, education, description, photo, phone, telegram } = req.body;
  
    if (Number.isNaN(+id)) {
      return res.status(400).json({ message: 'Id must be a number' });
    }
    try {
      const post = await Lawyer.findByPk(id);
      if (!post) {
        return res.status(404).json({ message: 'Lawyer not found' });
      }
      if (post.userId !== res.locals.user.id && res.locals.user.id !== 2) {
        return res.status(401).json({ message: 'Unable to complete' });
      }
      // Обновление записи с новыми данными
      post.name = name ?? post.name;
      post.education = education ?? post.education;
      post.photo = photo ?? post.photo;
      post.phone = phone ?? post.phone;
      post.telegram = telegram ?? post.telegram;
      post.description = description ?? post.description;
      
      await post.save();
      res.json(post);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error' });
    }
  }); 



module.exports = lawyerRouter;
