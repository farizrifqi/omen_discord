Citizen.CreateThread(function()
	while true do
		SetDiscordAppId(959772713029873664) --change this to your discord developer application id
		SetDiscordRichPresenceAsset('zera') --add large image asset name here
        	SetDiscordRichPresenceAssetText('Test aja') --If you hover your mouse point to this asset this message will popup
		SetDiscordRichPresenceAssetSmall('gtavlogo') --add small image asset name here
		SetDiscordRichPresenceAssetSmallText('Server GABUT') --If you hover your mouse point to this asset this message will popup
		-- These are the buttons add button name and lins like shown
    SetDiscordRichPresenceAction(0, "IG AING", "https://www.instagram.com/frz.ra") --First Button on RPC, shows on side. Modify text and URL to your liking
    SetDiscordRichPresenceAction(1, "Connect", "fivem://connect/abcdefgh") --Second Button RPC, shows under one above
		Citizen.Wait(10000)
	end
end)