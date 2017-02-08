require 'sinatra'
require 'sinatra/reloader' if development?

get '/' do
  @title = "Home"
  erb :home
end

get '/sports' do
  @title = "Sports"
  erb :sports
end

get '/weather' do
  @title = "Weather"
  erb :weather
end

get '/gossip' do
  @title = "Gossip"
  erb :gossip
end

get '/celebrity' do
  @title = "Celebrity"
  erb :celebrity
end

post '/navigate' do
  case params[:destination].downcase
  when 'sports' then redirect to('/sports')
  when 'weather' then redirect to('/weather')
  when 'gossip' then redirect to('/gossip')
  when 'celebrity' then redirect to('/celebrity')
  else 
    @error = "invalid page selected"
    erb :home
  end
end