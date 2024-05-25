// scheduledMessages.js

// Import necessary modules
const Discord = require('discord.js');

// Function to send scheduled messages
const sendScheduledMessages = async (client) => {
  // Get the current date and time
  const currentDate = new Date();

  // Get the list of scheduled messages from a database or file
  const scheduledMessages = [
    {
      message: "Reminder: Community meeting tonight at 8pm!",
      channel: "general",
      date: new Date("2022-01-01T20:00:00"),
    },
    {
      message: "Don't forget to vote for the server event theme!",
      channel: "announcements",
      date: new Date("2022-01-05T12:00:00"),
    },
  ];

  // Iterate through the scheduled messages
  for (const scheduledMessage of scheduledMessages) {
    // Check if the current date and time match the scheduled date and time
    if (currentDate >= scheduledMessage.date) {
      // Find the channel to send the message to
      const channel = client.channels.cache.find(
        (ch) => ch.name === scheduledMessage.channel
      );

      // If the channel is found, send the message
      if (channel) {
        channel.send(scheduledMessage.message);
      } else {
        console.error(`Channel ${scheduledMessage.channel} not found.`);
      }
    }
  }
};

module.exports = { sendScheduledMessages };