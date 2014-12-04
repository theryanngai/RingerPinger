json.array! @usersports do |usersport|
	json.(usersport, :user, :sport, :skill)
end