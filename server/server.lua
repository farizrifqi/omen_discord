
AddEventHandler("playerConnecting", function(name, setReason, deferrals)
    deferrals.defer()
    deferrals.update("Checking requirements...")
	local _source = source
    local ids = exports.omen_logs:ExtractIdentifiers(_source)
	Wait(1000)
	exports.omen_discord:isRolePresent(ids.discord:gsub("discord:", ""), {'977881131057823744'}, function(userRoles)
        if userRoles then
            deferrals.update("✅ Requirements check successfully passed!")
            print("allowed")
            exports.omen_discord:playerJoin()
            Wait(1000)
        else
            deferrals.done("❌ You're not allowed to enter this server")
            print("not allowed")
        end
    end)
    deferrals.done()
end)
AddEventHandler("playerDropped", function(name, setReason, deferrals)
    exports.omen_discord:playerLeft()
end)