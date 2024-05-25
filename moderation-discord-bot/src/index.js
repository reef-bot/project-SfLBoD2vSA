// Import necessary modules and files
const Discord = require('discord.js');
const bot = require('./bot');
const kick = require('./commands/kick');
const ban = require('./commands/ban');
const mute = require('./commands/mute');
const warn = require('./commands/warn');
const spamDetection = require('./moderation/spamDetection');
const languageFilter = require('./moderation/languageFilter');
const logActions = require('./logging/logActions');
const roleSystem = require('./integration/roleSystem');
const scheduledMessages = require('./scheduling/scheduledMessages');

// Create a new Discord client
const client = new Discord.Client();

// Event listener for when the bot is ready
client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

// Event listener for incoming messages
client.on('message', async (message) => {
  // Check if the message is from a bot or from the client itself
  if (message.author.bot || message.author.id === client.user.id) {
    return;
  }

  // Check for spam and offensive language
  await spamDetection.checkSpam(message);
  await languageFilter.checkLanguage(message);

  // Check for commands
  if (message.content.startsWith('!kick')) {
    kick.execute(message);
  } else if (message.content.startsWith('!ban')) {
    ban.execute(message);
  } else if (message.content.startsWith('!mute')) {
    mute.execute(message);
  } else if (message.content.startsWith('!warn')) {
    warn.execute(message);
  }

  // Log the actions taken
  logActions.log(message);
});

// Event listener for when the bot joins a server
client.on('guildCreate', (guild) => {
  console.log(`Joined ${guild.name}!`);
  roleSystem.setupRoles(guild);
});

// Event listener for scheduled messages
client.on('ready', () => {
  scheduledMessages.schedule(client);
});

// Login to Discord with your app's token
client.login('your_token_here'); // Replace 'your_token_here' with your actual token

// Export the client for use in other files
module.exports = client;