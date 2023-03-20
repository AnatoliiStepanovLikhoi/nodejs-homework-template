const express = require('express');
const router = express.Router();

const asyncWrapper = require('../../helpers/asyncWrapper');

const authMiddleware = require('../../middlewars/authMiddleware');

const addUserValidation = require('../../middlewars/usersValidation/validation');

const {
  registrationController,
  loginController,
  logoutController,
} = require('../../controllers/authController');

router.post(
  '/register',
  addUserValidation,
  asyncWrapper(registrationController)
);
router.post('/login', asyncWrapper(loginController));
router.post('/logout', authMiddleware, asyncWrapper(logoutController));

module.exports = router;
