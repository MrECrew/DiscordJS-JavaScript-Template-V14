//MORE ADVANCED BY FAR
//UNDERSTAND DJS A BIT BEFORE THIS
//install the stuff like ffmpeg before this "npm install ffmpeg-static"
// djs voice "npm install @discordjs/voice libsodium-wrappers"

const { Client, SlashCommandBuilder } = require('discord.js')
const { createAudioPlayer, createAudioResource, generateDependencyReport, joinVoiceChannel, VoiceConnectionStatus, AudioPlayerStatus, NoSubscriberBehavior  } = require('@discordjs/voice'); //Get music stuff
const { join } = require('node:path')
    
    console.log(generateDependencyReport()); //not needed but gives some info on whats connected n stuff
    
    module.exports = {
    	data: new SlashCommandBuilder()
    		.setName('name')
    		.setDescription('desc')
        .addSubcommand(subcommand =>
		subcommand
			.setName('play') //music sub command for play
			.setDescription('Let the music begin!'))
    .addSubcommand(subcommand =>
		subcommand
			.setName('end') //end
			.setDescription('Ends the connection')),
    	async execute(interaction, client) {
 const channel = client.channels.cache.get('ID'); //the channel to play it in
          const connection = joinVoiceChannel({
    	      channelId: channel.id,
    	      guildId: channel.guild.id,
    	      adapterCreator: channel.guild.voiceAdapterCreator,
            selfDeaf: false,
          }); // setup the join stuff kinda
        if (interaction.options.getSubcommand() === 'play') { //get the sub command
    
          const player = createAudioPlayer({
    behaviors: {
        noSubscriber: NoSubscriberBehavior.Pause,
    },
});  
          let resource = createAudioResource(join(__dirname, "can.mp3")); //define the music to play put whatever.mp3 for this i have an examle
          // to use others you need differnt packages like ffmpeg for mp3s, I have only used mp3s so idk the rest
          resource.volume?.setVolume(1);
          const subscription = connection.subscribe(player);
    
          player.play(resource); //start to play the stuff
          connection.subscribe(player); //join the player and play into the vc kinda
    
          if (subscription) {
    	      setTimeout(() => subscription.unsubscribe(), 400_000); //auto stop after that time
          }
    
          interaction.reply("reply")
        }
          if (interaction.options.getSubcommand() === 'end') {
            
            //if (i.user === latestUser) {
             connection.destroy(); // leave the channel
             interaction.reply("Stopped playing anthem!");
             latestUser = "empty"
              
            //} else {
              //interaction.reply("Only the person who started the play can end it");
            //}
          }
    	},
    };