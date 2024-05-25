```javascript
// File: moderation-discord-bot/src/commands/warn.js

const Discord = require('discord.js');
const { logAction } = require('../logging/logActions');

module.exports = {
  name: 'warn',
  description: 'Warn a user for violating server rules',
  execute(message, args) {
    if (!message.member.hasPermission('KICK_MEMBERS')) {
      return message.reply('You do not have permission to warn users.');
    }

    const user = message.mentions.users.first();
    if (!user) {
      return message.reply('You need to mention a user to warn.');
    }

    const reason = args.slice(1).join(' ');
    if (!reason) {
      return message.reply('You must provide a reason for the warning.');
    }

    const embed = new Discord.MessageEmbed()
      .setColor('#ff0000')
      .setTitle('User Warned')
      .setDescription(`${user.tag} has been warned by ${message.author.tag}`)
      .addField('Reason', reason);

    const channel = message.guild.channels.cache.find(ch => ch.name === 'mod-logs');
    if (!channel) {
      return message.reply('Could not find a mod-logs channel.');
    }

    channel.send(embed);
    logAction('Warn', message.author.tag, user.tag, reason);
  },
};
```
Please note that this code assumes the presence of a 'mod-logs' channel in the server for logging moderation actions. The `logAction` function is a placeholder for a function that logs the action taken by the bot. This function should be implemented in the `logActions.js` file under the `logging` directory.