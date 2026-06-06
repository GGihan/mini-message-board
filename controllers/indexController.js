import { messages } from "../db.js";

export const createNewMessage = (req, res) => {
  const { text, user } = req.body;
  messages.push({ 
    text: text,
    user: user,
    added: new Date() 
  });
  res.redirect("/");
};