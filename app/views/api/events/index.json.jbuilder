json.array! @events do |event|
	json.(event, :id, :title, :description, :sport, :max_players, 
				:creator, :location, :users, :event_date)
end