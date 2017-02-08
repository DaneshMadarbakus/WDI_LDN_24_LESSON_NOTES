require "sinatra"
require_relative "./models/capitalize"

get "/" do
  Capitalize.cap("gerry")
end