json.array! @users do |user|
	json.(user, :id, :email, :first_name, :last_name, :location, :status, 
				:profile_picture)

	json.sports user.sports do |sport|
		json.(sport, :id, :name)
		json.skill user.usersports.where(sport_id: sport.id)[0].skill
	end
end