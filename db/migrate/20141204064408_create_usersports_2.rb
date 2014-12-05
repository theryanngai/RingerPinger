class CreateUsersports < ActiveRecord::Migration
  def change
    create_table :usersports do |t|
    	t.integer :user_id, null: false
    	t.integer :sport_id, null: false
    	t.string :skill, null: false

      t.timestamps
    end

    add_index :usersports, [:user_id, :sport_id], unique: true
    add_index :usersports, :user_id
    add_index :usersports, :sport_id
  end
end
