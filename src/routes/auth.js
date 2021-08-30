const express = require('express');
const { body } = require('express-validator');

const router = express.Router();

const authController = require('../controllers/auth');

router.post(
  '/register',
  [
    body('email').isEmail().withMessage('Email tiak sesuai'),
    body('password')
      .isLength({ min: 8 })
      .withMessage('Minimal panjang password 8 karakter'),
  ],
  authController.Register,
);

router.post('/login', authController.Login);

module.exports = router;
