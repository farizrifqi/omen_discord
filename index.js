/// <reference path="node_modules/@citizenfx/server/index.d.ts" />

const Discord = require('discord.js')

const { getPlayersOnline, isRolePresent } = require('./lib/functions')
let player = -1

const client = new Discord.Client({ intents: ["GUILDS", "GUILD_MESSAGES"] })
const config = require('./json/config.json')
const updatePlayer = (cPlayer) => {
    if (cPlayer != player){
        player = cPlayer
        if (player == 0){msg = "No Player"}
        else if(player > 1){msg = player+"/10 Players"}
        else{msg = player+"/10 Player"}
        client.user.setPresence({ activities: [{ name: msg }], status: 'online' });
        console.log("player updated")
    }else{
        console.log("player sama")
    }
}
const syncPlayer = () => {
    getPlayersOnline(config.server.ip, config.server.port)
        .then((response) => {
            let msg
            newPlayer = response.data.length
            updatePlayer(newPlayer)
        })
        .catch((err) => {
            console.log("Unable to check online players...", err)
        })
}
client.on('ready', async () => {
    console.log(`Logged in as ${client.user.tag}!`);
    client.user.setPresence({ activities: [{ name: "Starting up..." }], status: 'idle' });
    console.log(`Starting...`)
})

client.login(config.discord.bot_token);

exports('isRolePresent', isRolePresent)

exports('playerLeft', ()=> {
    player = player-1
    updatePlayer(player)
})
exports('playerJoin', ()=> {
    player = player+1
    updatePlayer(player)
})