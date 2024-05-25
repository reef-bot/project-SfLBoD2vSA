// logActions.js

const fs = require('fs');
const path = require('path');

const logFile = path.join(__dirname, '../../logs/actions.log');

function logAction(action, user, timestamp) {
  const logEntry = `${timestamp} - ${action} by ${user}\n`;

  fs.appendFile(logFile, logEntry, (err) => {
    if (err) {
      console.error('Error writing to log file:', err);
    }
  });
}

module.exports = {
  logAction,
};