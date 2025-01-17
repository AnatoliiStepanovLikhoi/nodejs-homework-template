const express = require('express');
const router = express.Router();

const asyncWrapper = require('../../helpers/asyncWrapper');

const authMiddleware = require('../../middlewars/authMiddleware');
const uploadUserPhoto = require('../../middlewars/avatarUploadMiddleware');
const createUserVerificationToken = require('../../middlewars/createUserVerificationToken');

const addUserValidation = require('../../middlewars/usersValidation/validation');

const {
  registrationController,
  loginController,
  logoutController,
  currentUserController,
  updateUserStatusController,
  updateAvatarController,
  verifyUserEmailController,
  resendVerifyUserEmailController,
} = require('../../controllers/authController');

router.post(
  '/register',
  addUserValidation,
  createUserVerificationToken,
  asyncWrapper(registrationController)
);
router.get(
  '/verify/:verificationToken',
  asyncWrapper(verifyUserEmailController)
);
router.post(
  '/verify',
  addUserValidation,
  asyncWrapper(resendVerifyUserEmailController)
);
router.post('/login', addUserValidation, asyncWrapper(loginController));
router.post('/logout', authMiddleware, asyncWrapper(logoutController));

router.post('/current', authMiddleware, asyncWrapper(currentUserController));
router.patch(
  '/',
  authMiddleware,
  addUserValidation,
  asyncWrapper(updateUserStatusController)
);
router.patch(
  '/avatars',
  authMiddleware,
  uploadUserPhoto,
  asyncWrapper(updateAvatarController)
);

module.exports = router;
