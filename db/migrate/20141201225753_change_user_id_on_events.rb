class ChangeUserIdOnEvents < ActiveRecord::Migration
  def self.up
  	change_column :events, :user_id, :integer, null: false
  end
end
