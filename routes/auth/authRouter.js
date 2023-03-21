const express = require('express');
const router = express.Router();

const asyncWrapper = require('../../helpers/asyncWrapper');

const authMiddleware = require('../../middlewars/authMiddleware');

const addUserValidation = require('../../middlewars/usersValidation/validation');

const {
  registrationController,
  loginController,
  logoutController,
  currentUserController,
} = require('../../controllers/authController');

router.post(
  '/register',
  addUserValidation,
  asyncWrapper(registrationController)
);
router.post('/login', addUserValidation, asyncWrapper(loginController));
router.post('/logout', authMiddleware, asyncWrapper(logoutController));

//! Current route & PATCH subsctiption
router.get('/current', authMiddleware, asyncWrapper(currentUserController));
router.patch('/');

module.exports = router;
