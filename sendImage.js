const TelegramBot = require('node-telegram-bot-api');
const token = '8048527911:AAHs8eLmbVuQVjxBdxGPGrlfkKZRuZ3Vp5w';
const chatId = '1319383788'; 

// The URL must be publicly accessible (e.g., http:// or https://)
const imageUrl = 'https://ibb.co/FktgbXBK'; // Example public image URL

const bot = new TelegramBot(token); 

bot.sendPhoto(chatId, imageUrl, {
    caption: 'Merl ey!!',
    parse_mode: 'HTML' // You can use HTML or Markdown in captions
})
.then(() => {
    console.log('Image successfully sent from URL!');
})
.catch((error) => {
    console.error('Error sending image from URL:', error.message);
});