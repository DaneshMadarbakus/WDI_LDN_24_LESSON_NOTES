class CreateTracks < ActiveRecord::Migration[5.0]
  def change
    create_table :tracks do |t|
      t.string :title
      t.integer :number
      t.float :duration
      t.references :album, foreign_key: true

      t.timestamps
    end
  end
end
