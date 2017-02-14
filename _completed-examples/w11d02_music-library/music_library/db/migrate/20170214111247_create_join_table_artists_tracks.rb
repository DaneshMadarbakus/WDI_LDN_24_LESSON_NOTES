class CreateJoinTableArtistsTracks < ActiveRecord::Migration[5.0]
  def change
    create_join_table :artists, :tracks do |t|
      # t.index [:artist_id, :track_id]
      # t.index [:track_id, :artist_id]
    end

    add_index :artists_tracks, [:artist_id, :track_id], unique: true
  end
end
