export const messages = [
  {
    id: 1,
    text: 'Hey, what is going on?',
    user: 'Jeff',
    added: new Date(),
  },
  {
    id: 2,
    text: 'Hello, World!',
    user: 'Charles',
    added: new Date(),
  },
  {
    id: 3,
    text: 'Welcome to the Club!',
    user: 'Chris',
    added: new Date(),
  },
];

export async function getMessageById(messageId) {
  return messages.find(message => message.id === messageId);
};