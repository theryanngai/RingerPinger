json.(
	@user, 
	:id,
	:email, 
	:first_name, 	
	:last_name, 
	:status,
	:about_me,
	:profile_picture,
	:location,
	:created_at, 
	:updated_at
)

json.sports @user.sports do |sport|
		json.(sport, :id, :name)
		json.skill @user.usersports.where(id: sport.id)[0].skill
	end

