class AddUniquenessToSportName < ActiveRecord::Migration
  def change
  	add_index :sports, :name, unique: true
  end
end
