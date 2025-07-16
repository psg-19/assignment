// models.jsx
const mongoose = require('mongoose');
const { Schema, model } = mongoose;

// User
const userSchema = new Schema({
  email: { type: String, required: true, unique: true, lowercase: true, trim: true },
  passwordHash: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});
const User = model('User', userSchema);

// Question subdocument
const questionSchema = new Schema({
  type: { type: String, enum: ['text','multiple-choice'], required: true },
  label: { type: String, required: true },
  options: { type: [String], default: undefined }
});

// Form
const formSchema = new Schema({
  title: { type: String, required: true, trim: true },
  questions: { type: [questionSchema], required: true, validate: [q => q.length>=3 && q.length<=5, '3-5 questions'] },
  createdBy: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  createdAt: { type: Date, default: Date.now }
});
const Form = model('Form', formSchema);

// Response
const answerSchema = new Schema({ questionId: { type: Schema.Types.ObjectId, required: true }, answer: { type: String, required: true } });
const responseSchema = new Schema({
  formId: { type: Schema.Types.ObjectId, ref: 'Form', required: true },
  answers: { type: [answerSchema], required: true },
  submittedAt: { type: Date, default: Date.now }
});
const Response = model('Response', responseSchema);

module.exports = { User, Form, Response };
