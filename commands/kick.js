const { MessageEmbed } = require("discord.js");
const { perms } = require('../config.json')

exports.run = async (client, message, args) => {
    if (!perms.includes(message.author.id)) return message.channel.send("Que voulais-tu faire ? Il n'y a rien à voir ici !")

        if(message.mentions.users.size === 0) return message.channel.send("Tu dois mentionner un utilisateur !")
        
        const reason = args.slice(1).join(' ') || `Aucune raison spécifié !`

        const kick = message.guild.member(message.mentions.users.first())

        if(!kick) return message.channel.send('Utilisateur introuvable !')

        if(!message.guild.me.hasPermission("KICK_MEMBERS")) {
            return message.channel.send("Je n'ai pas la permission pour kick !");
        }
        
        if(!kick.kickable) {
            return message.channel.send("Kick impossible !");
        }

        try{
            const embed = new MessageEmbed()
            .setColor('#3867d6')
            .setTitle("KICK !")
            .setDescription(`Vous avez été kick du Max de Culture`)
            .addField(`Raison :`, reason)
            .setTimestamp()
            await kick.send(embed)
          } catch {
          }
        kick.kick(reason).then(member => {
            message.channel.send(`**${member.user.tag}** a été kick par **${message.author.tag}** pour **${reason}**`)

            client.channels.cache.get('745938396328755220').send(new MessageEmbed()
              .setColor('#3867d6')
              .setTitle("KICK !")
              .addField('User :', member.user.tag)
              .addField('Banni par :', message.author.tag)
              .addField('Raison :', reason)
              .setTimestamp())
        });
    }
    
exports.help = {
    name: "expulser"
}