Rails.application.routes.draw do
  root "users#index"
  resources :users, only: [:index, :create]
  resources :sessions, only: [:create]
  get 'login', to: 'sessions#new'
  delete 'logout', to: 'sessions#destroy'
  get 'register', to: 'users#new'
end
