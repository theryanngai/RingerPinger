json.array! @usersports do |usersport|
	json.(usersport, :id, :user, :sport, :skill)
end