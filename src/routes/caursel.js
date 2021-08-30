const express = require('express');
const { body } = require('express-validator');

const router = express.Router();

const caurselController = require('../controllers/caursel');

router.post(
  '/post',
  [
    body('title').isLength({ min: 5 }).withMessage('Title tidak sesuai'),
    body('body').isLength({ min: 5 }).withMessage('body tidak sesuai'),
  ],
  caurselController.createCaursel,
);

router.get('/posts', caurselController.getAllCaursel);
router.put(
  '/post/:caurselId',
  [
    body('title').isLength({ min: 5 }).withMessage('Title tidak sesuai'),
    body('body').isLength({ min: 5 }).withMessage('body tidak sesuai'),
  ],
  caurselController.updateCaursel,
);
router.delete('/post/:caurselId',caurselController.deleteCaursel)

module.exports = router;
