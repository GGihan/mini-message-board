import { Router, text } from "express";
import { messages } from "../db.js";
import { createNewMessage, viewMessage } from "../controllers/indexController.js";

const indexRouter = Router();

indexRouter.get('/', (req, res) => {
  res.render('index', { title: 'Mini Messageboard', messages: messages });
});

indexRouter.get('/new', (req, res) => {
  res.render('form', { title: 'New Message' });
});

indexRouter.get('/message/:messageId', viewMessage);

indexRouter.post('/new', createNewMessage);

export default indexRouter;