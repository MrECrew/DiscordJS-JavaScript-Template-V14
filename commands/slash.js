const { Client, SlashCommandBuilder } = require('discord.js')

module.exports = {
	data: new SlashCommandBuilder()
		.setName('cmdName')
		.setDescription('cmdDesc'),
	async execute(interaction, client) {
  
      const MUT = client.channels.cache.get('channelID'); // To send to a certain channel by getting it bys its id
      MUT.send(`Message`) // send to defined server
    
      interaction.reply("Reply directly to the message")
      //interaction.reply({ content: 'Message', ephemeral: true }) this is how you make the response 'invisible'

	},
};