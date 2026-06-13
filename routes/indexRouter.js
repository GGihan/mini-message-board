import { Router } from "express";
import { messages } from "../db/db.js";
import * as indexController from "../controllers/indexController.js";

const indexRouter = Router();

indexRouter.get('/', (req, res) => {
  res.render('index', { title: 'Mini Messageboard', messages: messages });
});

indexRouter.get('/new', (req, res) => {
  res.render('form', { title: 'New Message' });
});

indexRouter.get('/message/:messageId', indexController.viewMessage);

indexRouter.post('/new', indexController.createNewMessage);

export default indexRouter;