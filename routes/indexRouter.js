import { Router } from "express";
import { messages } from "../db/db.js";
import * as indexController from "../controllers/indexController.js";

const indexRouter = Router();

indexRouter.get('/', indexController.messageListGet);

indexRouter.get('/new', indexController.messageNewGet);

indexRouter.get('/message/:messageId', indexController.viewMessage);

indexRouter.post('/new', indexController.messageNewPost);

export default indexRouter;