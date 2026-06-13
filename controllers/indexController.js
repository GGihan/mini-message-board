import { messages, getMessageById } from "../db/db.js";
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

export const messageNewPost = async (req, res) => {
  try {
    const { username, text } = req.body;
    await db.insertMessage(username, text);
    res.redirect('/');
  } catch (error) {
    next(error);
  } 
};

export async function viewMessage(req, res, next) {
  try {
    const { messageId } = req.params;
    const message = await getMessageById(Number(messageId));
    if (!message) {
      const err = new Error('Message not found');
      err.status = 404;
      return next(err);
    }
    res.render('message', { title: 'View Message', message: message });
  } catch (error) {
    next(error);
  }
}