const express = require('express');
const router = express.Router();

const asyncWrapper = require('../../helpers/asyncWrapper');

const authMiddleware = require('../../middlewars/authMiddleware');
const uploadUserPhoto = require('../../middlewars/avatarUploadMiddleware');

const addUserValidation = require('../../middlewars/usersValidation/validation');

const {
  registrationController,
  loginController,
  logoutController,
  currentUserController,
  updateUserStatusController,
  updateAvatarController,
  verifyUserEmailController,
} = require('../../controllers/authController');

router.post(
  '/register',
  addUserValidation,
  asyncWrapper(registrationController)
);
router.get(
  '/verify/:verificationToken',
  asyncWrapper(verifyUserEmailController)
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
