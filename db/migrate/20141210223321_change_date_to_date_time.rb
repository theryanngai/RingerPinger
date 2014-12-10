class ChangeDateToDateTime < ActiveRecord::Migration
  def self.up
  	change_column :events, :event_date, :date, null: false
  end
end
