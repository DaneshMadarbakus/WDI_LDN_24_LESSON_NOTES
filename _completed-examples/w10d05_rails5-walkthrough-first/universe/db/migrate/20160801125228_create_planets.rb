class CreatePlanets < ActiveRecord::Migration[5.0]
  def change
    create_table :planets do |t|
      t.string :name
      t.float :distance_from_sun
      t.float :mass
      t.boolean :rings
      t.boolean :life

      t.timestamps
    end
  end
end
