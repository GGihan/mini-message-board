import { messages, getMessageById } from "../db.js";

export const createNewMessage = (req, res) => {
  const { text, user } = req.body;
  const nextId = messages.length > 0 ? messages[messages.length - 1].id + 1 : 1;
  messages.push({ 
    text: text,
    user: user,
    added: new Date(),
    id: nextId,
  });
  res.redirect("/");
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