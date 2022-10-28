//This is not detailed description
//It is a simple template of what to do using working code

const fs = require('fs');
const { Client, GatewayIntentBits, Partials, EmbedBuilder, Collection } = require('discord.js');
const { token } = require('./config.json');

const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMembers, GatewayIntentBits.GuildVoiceStates], partials: [Partials.Channel] }); //Make the client with its intent that you need

client.commands = new Collection();
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
  const command = require(`./commands/${file}`);
  client.commands.set(command.data.name, command);
}

function sleep(milliseconds) {
  return new Promise((resolve) => {
    setTimeout(resolve, milliseconds);
  });
}

client.on("debug", ( e ) => console.log(e)); //ngl no clue what this does

client.once('ready', () => { // 'Ready' means that when the bot goes online and is ready it will do this and the once means it will set it once
    console.log("Online") //Log the console as online to see the bot's status
    client.user.setActivity("Viva la France!"); // Sets the status to "playing x"
});

client.on('interactionCreate', async interaction => {
  if (!interaction.isCommand()) return;

  const command = client.commands.get(interaction.commandName);

  if (!command) return;

  try {
    await command.execute(interaction, client);
  } catch (error) {
    console.error(error);
    await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
  }
});



client.login(token); //login