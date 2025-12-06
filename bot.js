import TelegramBot from 'node-telegram-bot-api';

// 1. Configuration (Replace with your actual values)
const token = '8048527911:AAHs8eLmbVuQVjxBdxGPGrlfkKZRuZ3Vp5w';

// Image URL (must be publicly accessible)
const imageUrl = 'https://ibb.co/FktgbXBK';

// Create a bot instance and enable polling to receive messages
const bot = new TelegramBot(token, { polling: true }); 

console.log('Bot is running and listening for messages...');

// --- Event Listener for the /start command ---
bot.onText(/\/start/, (msg) => {
    const chatId = msg.chat.id;
    
    // 1. Define the Welcome Text Message
    const welcomeText = `👋 Hello jkj ${msg.from.first_name}.`;

    // 2. Define the Image Caption
    const imageCaption = 'Merl ey!!';

    // --- Action 1: Send the Text Message ---
    bot.sendMessage(chatId, welcomeText)
        .then(() => {
            console.log(`Text message sent to ${chatId}`);

            // --- Action 2: Send the Image Message (immediately after the text) ---
            // Send the photo from URL
            return bot.sendPhoto(chatId, imageUrl, {
                caption: imageCaption
            });
        })
        .then(() => {
            console.log(`Image sent to ${chatId}`);
        })
        .catch((error) => {
            console.error('Error in /start handler:', error.message);
        });
});

// Optional: Add a listener for any other messages
bot.on('message', (msg) => {
    if (msg.text !== '/start') {
        // Echo back a simple response for non-start messages
        bot.sendMessage(msg.chat.id, `I received your message: "${msg.text}". Try clicking /start if you haven't!`);
    }
});