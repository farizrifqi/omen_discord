const axios = require('axios').default;

const getPlayersOnline = async(ip,port)=>{
    const res = await axios({
        url: `http://${ip}:${port}/players.json`
    });
    return res
}
const getError = (error) => {
    if (error.response) {
        return `${error.response.status} : ${errorCodes[error.response.status]}` || 'Unknown error';
      }
      return error.message;
}
const getUserDiscord = (user) => {
    if (typeof user === 'string') return user;
    if (!GetPlayerName(user)) return false;
    for (let idIndex = 0; idIndex <= GetNumPlayerIdentifiers(user); idIndex ++) {
      if (GetPlayerIdentifier(user, idIndex).indexOf('discord:') !== -1) return GetPlayerIdentifier(user, idIndex).replace('discord:', '');
    }
    return false;
}

const isRolePresent = (user, role, ...args) => {
    const isArgGuild = typeof args[0] === 'string';
    const selectedGuild = isArgGuild ? args[0] : config.discord.guildId;
    const discordUser = getUserDiscord(user); 
    if (!discordUser) return isArgGuild ? args[1](false) : args[0](false);
    axios({
        method: 'get',
        url: `https://discord.com/api/v8/guilds/${selectedGuild}/members/${discordUser}`,
        headers: {
            Authorization: `Bot ${config.discord.bot_token}`,
            'Content-Type': 'application/json'
        }
    }).then((res) => {
      const hasRole = typeof role === 'string' ? res.data.roles.includes(role) : res.data.roles.some((curRole, index) => res.data.roles.includes(role[index]));
      isArgGuild ? args[1](hasRole, res.data.roles) : args[0](hasRole, res.data.roles);
    }).catch((err) => {
      if (err.response.status === 404) {
        isArgGuild ? args[1](false) : args[0](false);
      }
    });
}
module.exports = { getPlayersOnline, getError, isRolePresent }