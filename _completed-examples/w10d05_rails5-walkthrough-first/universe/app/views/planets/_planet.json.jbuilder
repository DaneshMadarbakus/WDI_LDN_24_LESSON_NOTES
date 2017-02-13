json.extract! planet, :id, :name, :distance_from_sun, :mass, :rings, :life, :created_at, :updated_at
json.url planet_url(planet, format: :json)