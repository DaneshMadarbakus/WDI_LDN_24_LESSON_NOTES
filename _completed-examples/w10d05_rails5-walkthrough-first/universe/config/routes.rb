Rails.application.routes.draw do
  root 'statics#home'
  resources :moons
  resources :planets
end
