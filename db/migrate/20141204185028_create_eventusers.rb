class CreateEventusers < ActiveRecord::Migration
  def change
    create_table :eventusers do |t|
    	t.integer :user_id, null: false
    	t.integer :event_id, null: false

      t.timestamps
    end

    add_index :eventusers, [:user_id, :event_id], unique: true
  end
end
