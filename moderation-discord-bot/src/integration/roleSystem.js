// File: moderation-discord-bot/src/integration/roleSystem.js

// Dependencies
const Discord = require('discord.js');

// Function to assign a role to a user
const assignRole = (user, roleName) => {
  const guild = user.guild;
  const role = guild.roles.cache.find((r) => r.name === roleName);
  
  if (!role) {
    console.error(`Role ${roleName} not found`);
    return;
  }
  
  user.roles.add(role)
    .then(() => console.log(`Role ${roleName} assigned to user ${user.username}`))
    .catch((error) => console.error(`Error assigning role: ${error}`));
};

// Function to revoke a role from a user
const revokeRole = (user, roleName) => {
  const guild = user.guild;
  const role = guild.roles.cache.find((r) => r.name === roleName);
  
  if (!role) {
    console.error(`Role ${roleName} not found`);
    return;
  }
  
  user.roles.remove(role)
    .then(() => console.log(`Role ${roleName} revoked from user ${user.username}`))
    .catch((error) => console.error(`Error revoking role: ${error}`));
};

// Function to check if a user has a specific role
const hasRole = (user, roleName) => {
  const guild = user.guild;
  const role = guild.roles.cache.find((r) => r.name === roleName);
  
  if (!role) {
    console.error(`Role ${roleName} not found`);
    return false;
  }
  
  return user.roles.cache.has(role.id);
};

module.exports = {
  assignRole,
  revokeRole,
  hasRole
}; 

// This file provides functions to assign, revoke, and check roles for users in the Discord server. The functions use the Discord.js library to interact with the Discord API. The assignRole function assigns a specified role to a user, the revokeRole function revokes a specified role from a user, and the hasRole function checks if a user has a specific role. The functions handle errors and provide logging for successful role assignments and revocations.