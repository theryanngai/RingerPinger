class CreateEvents < ActiveRecord::Migration
  def change
    create_table :events do |t|
    	t.string :title, null: false
    	t.string :description, null: false
    	t.string :sport, null: false
    	t.string :max_players, null: false

    	t.string :location

      t.timestamps
    end
  end
end
