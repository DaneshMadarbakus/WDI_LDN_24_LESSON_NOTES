require 'sinatra'
require 'sinatra/reloader' if development?
require 'pry' if development?

get '/' do
  @header = "Homepage"
  erb :home
end

get '/hi' do
  puts "hi"
  # binding.pry
  "Hello world"
end

# get '/friends/:name' do
#   "This friend's name is: #{params[:name]}"
# end

get '/friends/:first/:last/:age' do
  "your name is #{params[:first]} #{params[:last]} and you are #{params[:age]} years old"
end