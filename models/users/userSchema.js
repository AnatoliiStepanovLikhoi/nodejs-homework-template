const { model, Schema } = require('mongoose');
const bcrypt = require('bcrypt');
const gravatar = require('gravatar');
const sendUserVerificationEmail = require('../../services/sendEmailService');

const userSchema = new Schema(
  {
    password: {
      type: String,
      required: [true, 'Set password for user'],
      minlength: 7,
      select: false,
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
    },
    subscription: {
      type: String,
      enum: ['starter', 'pro', 'business'],
      default: 'starter',
    },
    token: String,
    verify: {
      type: Boolean,
      default: false,
    },
    verificationToken: {
      type: String,
      required: [true, 'Verify token is required'],
    },
    avatarURL: {
      type: String,
      // required: true,
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

userSchema.pre('save', async function (next) {
  if (this.isNew) {
    this.avatarURL = gravatar.url(this.email, {
      protocol: 'http',
      s: '250',
      d: 'retro',
    });
  }

  if (!this.isModified('password')) return next();
  const salt = await bcrypt.genSalt(10);

  this.password = await bcrypt.hash(this.password, salt);

  next();
});

userSchema.post('save', async function () {
  await sendUserVerificationEmail(this.email, this.verificationToken);
});

// userSchema.pre('save', async function () {
//   this.avatarURL = gravatar.url(this.email, {
//     protocol: 'http',
//     s: '250',
//     d: 'retro',
//   });
// });

const User = model('users', userSchema);

module.exports = User;
