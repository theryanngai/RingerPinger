json.array! @profiles do |profile|
	json.(
				profile, 
				:id,
				:about_me, 
				:profile_picture, 
				:updated_at, 
				:created_at,
				:user
				)
end