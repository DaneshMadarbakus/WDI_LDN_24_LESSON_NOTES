class CreateAlbums < ActiveRecord::Migration[5.0]
  def change
    create_table :albums do |t|
      t.string :title
      t.text :description
      t.date :release_date
      t.integer :owner_id

      t.timestamps
    end
  end
end
