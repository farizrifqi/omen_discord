fx_version 'bodacious'
game 'gta5'

dependency 'yarn'

server_scripts {
	"index.js",
	"server/server.lua",
}

client_scripts {
	"client/client.lua",
}

server_exports {
	'isRolePresent',
	'playerLeft',
	'playerJoin'
  }