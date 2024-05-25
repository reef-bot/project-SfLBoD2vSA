```javascript
// File: moderation-discord-bot/models/reputationSystem.js

// Dependencies
const fs = require('fs');

// Reputation System Class
class ReputationSystem {
  constructor() {
    this.reputationData = this.loadReputationData();
  }

  // Load reputation data from file
  loadReputationData() {
    try {
      const data = fs.readFileSync('reputationData.json');
      return JSON.parse(data);
    } catch (error) {
      console.error('Error loading reputation data:', error);
      return {};
    }
  }

  // Save reputation data to file
  saveReputationData() {
    try {
      fs.writeFileSync('reputationData.json', JSON.stringify(this.reputationData, null, 2));
    } catch (error) {
      console.error('Error saving reputation data:', error);
    }
  }

  // Get reputation for a user
  getReputation(userId) {
    return this.reputationData[userId] || 0;
  }

  // Add reputation for a user
  addReputation(userId, amount) {
    this.reputationData[userId] = (this.reputationData[userId] || 0) + amount;
    this.saveReputationData();
  }

  // Remove reputation for a user
  removeReputation(userId, amount) {
    this.reputationData[userId] = Math.max((this.reputationData[userId] || 0) - amount, 0);
    this.saveReputationData();
  }

  // Reset reputation for a user
  resetReputation(userId) {
    delete this.reputationData[userId];
    this.saveReputationData();
  }
}

// Export ReputationSystem class
module.exports = ReputationSystem;
```

In the `reputationSystem.js` file, we have defined a `ReputationSystem` class that handles the management of user reputations. The class contains methods to load, save, get, add, remove, and reset reputations for users. The reputation data is stored in a JSON file named `reputationData.json`. We use the `fs` module to read and write data to this file. The class is exported for use in other parts of the project.