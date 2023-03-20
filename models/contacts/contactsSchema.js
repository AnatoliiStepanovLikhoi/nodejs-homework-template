const { model, Schema, SchemaTypes } = require('mongoose');

const contactsSchema = new Schema(
  {
    name: {
      type: String,
      minlength: 2,
      maxlength: 30,
      required: [true, 'Set name for contact'],
    },
    email: {
      type: String,
      unique: true,
      minlength: 2,
      maxlength: 30,
      required: [true, 'Set email for contact'],
    },
    phone: {
      type: String,
      required: [true, 'Set phone number for contact'],
    },
    owner: {
      type: SchemaTypes.ObjectId,
      ref: 'user',
    },
    favorite: {
      type: Boolean,
      default: false,
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

const Contact = model('contacts', contactsSchema);

module.exports = Contact;
