json.array! @events do |event|
	json.(event, :id, :title, :description, :sport, :max_players, :user_id, :location)
end