## Making a music library

First we need to work out what we want our models to look like.

### Artist
- has_and_belongs_to_many :tracks
- has_many :albums, through: :tracks
- has_many :albums_as_owner, class_name: "Artist", foreign_key: :owner_id

### Album
- belongs_to :owner, class_name: "Artist", foreign_key: :owner_id
- has_many :tracks
- has_many :artists, :through: :tracks

### Track
- belongs_to :album
- has_and_belongs_to_many :artists

## Creating the app using scaffolds

We can make this app with a few commands using the Rails generators.

```bash
$ rails new music_library -d postgresql
$ rails g scaffold Artist name
$ rails g scaffold Album title description:text release_date:date owner_id:integer
$ rails g scaffold Track title number:integer duration:float album:references
$ rails g migration CreateJoinTableArtistsTracks artist track
```

## Add the relationships to the models

Artist:

```ruby
class Artist < ApplicationRecord
  has_many :albums_as_owner, class_name: "Artist", foreign_key: :owner_id
  has_and_belongs_to_many :tracks
  has_many :albums, through: :tracks
end
```

Album:

```ruby
class Album < ApplicationRecord
  belongs_to :owner, class_name: "Artist", foreign_key: :owner_id
  has_many :tracks
  has_many :artists, through: :tracks
end
```

Track:

```ruby
class Track < ApplicationRecord
  belongs_to :album
  has_and_belongs_to_many :artists
end
```

## Add validations

Artist:

```ruby
class Artist < ApplicationRecord
  has_many :albums_as_owner, class_name: "Album", foreign_key: :owner_id
  has_and_belongs_to_many :tracks
  has_many :albums, through: :tracks

  validates :name, presence: true
end
```

The strange relationship here is saying:

> Look into the albums table for the column labelled as 'owner_id' and find any where the integer matches this artist's primary key

Album:

```ruby
class Album < ApplicationRecord
  belongs_to :owner, class_name: "Artist", foreign_key: :owner_id
  has_many :tracks
  has_many :artists, through: :tracks

  validates :owner_id, presence: :true
  validates :title, presence: :true
end
```

The strange relationship here is saying:

> Use the value for this record's `owner_id` and look in the artists table for a record with that id.

Track

```ruby
class Track < ApplicationRecord
  belongs_to :album
  has_and_belongs_to_many :artists

  validates :album_id, presence: true
  validates :title, uniqueness: true
end
```

## Migrate

Make sure we create and migrate the database:

```bash
$ rails db:create db:migrate
```

## Seeds

I'm now going to build my seeds by testing the commands in the terminal:

```ruby
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
track1.artist << artist2

# Check the relationships
# artist1.tracks
# artist2.tracks
```

Copy these into the seeds file and remember to delete everything:

```ruby
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
track1.artist << artist2

# Check the relationships
# artist1.tracks
# artist2.tracks
```

Drop the database, run the migrations and the seeds:

```bash
$ rails db:drop db:create db:migrate db:seed
```

## Validating the Join Table?

We can update the migration for the join table to ensure that you can't add duplicate records like this:

```ruby
class CreateJoinTableArtistsTracks < ActiveRecord::Migration[5.0]
  def change
    create_join_table :artists, :tracks do |t|
      # t.index [:artist_id, :track_id]
      # t.index [:track_id, :artist_id]
    end

    add_index :artists_tracks, [:artist_id, :track_id], unique: true
  end
end
```
