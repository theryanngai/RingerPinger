json.array! @usersports do |usersport|
	json.(usersport, :id, :user, :sport, :skill, :user_id, :sport_id)
end