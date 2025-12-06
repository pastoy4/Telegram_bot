// Import the library
import TelegramBot from 'node-telegram-bot-api';

// Replace with your actual bot token and chat ID
const token = '8048527911:AAHs8eLmbVuQVjxBdxGPGrlfkKZRuZ3Vp5w'; 
const chatId = '1309587264'; // Can be a user ID or a group/channel ID

// Create a new bot instance
// The {polling: true} is usually for receiving messages, but for a simple send script, 
// you can omit it if you only want to send messages programmatically.
// For a one-off send, just use:
const bot = new TelegramBot(token); 

const messageText = 'Hello Vengsorng Seng This is me from Nodejs.';

// Use the sendMessage method
bot.sendMessage(chatId, messageText)
  .then(() => {
    console.log('Message successfully sent!');
  })
  .catch((error) => {
    console.error('Error sending message:', error.response.body);
  });

// Note: If you want to send a message *in response* to a user's message, 
// you would typically use the bot.on('message', ...) event listener to get the chatId 
// and then use bot.sendMessage(chatId, 'Your reply').