// moderation-discord-bot/src/moderation/languageFilter.js

// Import necessary modules
const { Client, Message } = require('discord.js');
const config = require('../../config/config.json');
const { logLanguageViolation } = require('../logging/logActions');

// Initialize Discord client
const client = new Client();

// Set up language filter
const languageFilter = {
  bannedWords: ['badword1', 'badword2', 'badword3'],
  checkMessage: function (message) {
    const content = message.content.toLowerCase();
    for (const word of this.bannedWords) {
      if (content.includes(word)) {
        this.handleViolation(message);
        return;
      }
    }
  },
  handleViolation: function (message) {
    message.delete();
    logLanguageViolation(message.author, message.content);
    message.author.send('Please refrain from using inappropriate language.');
  },
};

// Event listener for message
client.on('message', (message) => {
  if (message.member.roles.cache.some((role) => role.name === config.adminRole)) {
    return; // Skip language filter for admins
  }
  languageFilter.checkMessage(message);
});

// Log in to Discord with bot token
client.login(config.botToken);

// Export client for testing purposes
module.exports = client; 

// This file is responsible for implementing the language filter feature in the moderation bot. It checks messages for banned words and handles violations by deleting the message, logging the violation, and sending a warning to the user. The language filter is applied to all messages except those from users with the admin role. The bot logs in with the provided bot token for Discord API interaction.