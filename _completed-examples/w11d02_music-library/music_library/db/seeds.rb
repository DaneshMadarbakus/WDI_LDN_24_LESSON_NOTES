Artist.destroy_all
Album.destroy_all
Track.destroy_all

artist1 = Artist.create!(name: "Big L")
album1 = Album.create!(title: "Lifestylez ov da Poor & Dangerous", description: "Oh dear.", release_date: DateTime.parse("28/03/1995"),  owner_id: artist1.id)

# Check the relationships
# artist1.owner
# artist1.albums_as_owner

artist2 = Artist.create!(name: "Jay Z")

# Automatically assign the album_id to the track using the relationship
track1 = album1.tracks.create!(title: "Da Graveyard", number: 8, duration: 5.24)

# Assign the artists to the track
track1.artists << artist1
track1.artists << artist2

# Check the relationships
# artist1.tracks
# artist2.tracks
