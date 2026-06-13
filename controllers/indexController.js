import * as db from '../db/queries.js';

export const messageListGet = async (req, res, next) => {
  try {
    const allMessages = await db.getAllMessages();
    res.render('index', {
      title: 'Mini Messageboard',
      messages: allMessages,
    });
  } catch (error) {
    next(error);
  }
};

export const messageNewGet = (req, res) => {
  res.render('form', { title: 'New Message' });
};

export const messageNewPost = async (req, res, next) => {
  try {
    const { username, text } = req.body;
    await db.insertMessage(username, text);
    res.redirect('/');
  } catch (error) {
    next(error);
  } 
};

export const messageViewGet = async (req, res, next) => {
  try {
    const { messageId } = req.params;
    const message = await db.getMessage(messageId);
    if (!message) {
      const error = new Error('Message not found');
      error.status = 404;
      return next(error);
    }
    res.render('message', {
        title: 'View Message',
        message: message,
      });
  } catch (error) {
    next(error);
  }
};