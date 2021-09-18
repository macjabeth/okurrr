const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('smack')
    .setDescription('Inspired by TikTok.'),

  // This inspirational quote has been provided to you by...
  // They Said So (theysaidso.com)
  async execute(interaction) {
    await interaction.reply('Smack my a$$ like a :drum:');
  }
};
