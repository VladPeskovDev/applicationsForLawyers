const casesRouter = require('express').Router();
const { Cases, User } = require('../../db/models');
const { verifyAccessToken } = require('../middlewares/verifyTokens');
const multer = require('multer');


// Настройка multer для сохранения файлов
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage });

casesRouter.route('/').get(async (req, res) => {
  try {
    const allCases = await Cases.findAll();
    res.json(allCases);
  } catch (error) {
    res.status(500).send('Internal server error');
  }
});

casesRouter.route('/').post(verifyAccessToken,
  upload.fields([
    { name: 'photo1', maxCount: 1 },
    { name: 'photo2', maxCount: 1 },
    { name: 'photo3', maxCount: 1 },
    { name: 'photo4', maxCount: 1 },
    { name: 'photo5', maxCount: 1 },
  ]),
  async (req, res) => {
    try {
      const userId = res.locals.user.id;
      if (userId !== 2) {
        return res.status(403).json({ error: 'You are not authorized to create cases.' });
      }

      const post = await Cases.create({
        title: req.body.title,
        description: req.body.description,
        userID: userId,
        photo1: req.files?.photo1 ? req.files.photo1[0].path : null,
        photo2: req.files?.photo2 ? req.files.photo2[0].path : null,
        photo3: req.files?.photo3 ? req.files.photo3[0].path : null,
        photo4: req.files?.photo4 ? req.files.photo4[0].path : null,
        photo5: req.files?.photo5 ? req.files.photo5[0].path : null,
      });

      res.json(post);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error' });
    }
  }
);

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
