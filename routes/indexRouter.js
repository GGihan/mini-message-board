import { Router, text } from "express";

const indexRouter = Router();

const messages = [
  {
    text: 'Hey, what is going on?',
    user: 'Jeff',
    added: new Date(),
  },
  {
    text: 'Hello, World!',
    user: 'Charles',
    added: new Date(),
  },
  {
    text: 'Welcome to the Club!',
    user: 'Chris',
    added: new Date(),
  },
];

indexRouter.get('/', (req, res) => {
  res.render('index', { title: 'Mini Messageboard', messages: messages });
});

indexRouter.get('/new', (req, res) => {

});

export default indexRouter;