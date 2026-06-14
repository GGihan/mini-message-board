import * as db from '../db/queries.js';
import { body, validationResult, matchedData } from 'express-validator';

const usernameLengthErr = 'must be between 3 and 25 characters.';
const textLengthErr = 'must be between 10 and 400 characters.';
const emptyErr = 'can\'t be empty.';
const alphaErr = 'must only contain letters and numbers.';

const validateMessage = [
  body('username')
    .trim()
    .notEmpty().withMessage(`Username ${emptyErr}`)
    .isLength({ min: 3, max: 25 }).withMessage(`Username ${usernameLengthErr}`)
    .isAlphanumeric().withMessage(`Username ${alphaErr}`),
  body('text')
    .trim()
    .notEmpty().withMessage(`Text ${emptyErr}`)
    .isLength({ min: 10, max: 400 }).withMessage(`Text ${textLengthErr}`)
];

export const messageListGet = async (req, res) => {
  const allMessages = await db.getAllMessages();
  res.render('index', {
    title: 'Mini Messageboard',
    messages: allMessages,
  });
};

export const messageNewGet = (req, res) => {
  res.render('form', { title: 'New Message' });
};

export const messageNewPost = [
  validateMessage,
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()){
      return res.status(400).render('form', {
        title: 'New Message',
        errors: errors.array(),
        oldData: req.body, 
      });
    }
    const { username, text } = matchedData(req);
    await db.insertMessage(username, text);
    res.redirect('/');
  }
];

export const messageViewGet = async (req, res) => {
  const { messageId } = req.params;
  const message = await db.getMessage(messageId);
  if (!message) {
    const error = new Error('Message not found');
    error.status = 404;
    throw error;
  }
  res.render('message', {
    title: 'View Message',
    message: message,
  });
};