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
  res.render('form', { title: 'New Message' })
});

indexRouter.post('/new', (req, res) => {
  const { text, user } = req.body;
  messages.push({ text: text, user: user, added: new Date() });
  res.redirect("/");
});

export default indexRouter;