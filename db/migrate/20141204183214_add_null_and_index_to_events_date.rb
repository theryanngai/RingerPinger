class AddNullAndIndexToEventsDate < ActiveRecord::Migration
  def change
  	change_column :events, :event_date, :date, null: false
  end
end
