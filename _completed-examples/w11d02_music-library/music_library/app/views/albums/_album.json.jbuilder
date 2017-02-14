json.extract! album, :id, :title, :description, :release_date, :owner_id, :created_at, :updated_at
json.url album_url(album, format: :json)