Rails.application.routes.draw do
  get 'pages/everyone'

  get 'pages/logged_in'

  get 'pages/logged_out'

  get 'secret/visible'

  get 'secret/secret'

  root "users#index"
  resources :users, only: [:index, :create]
  resources :sessions, only: [:create]
  get 'login', to: 'sessions#new'
  delete 'logout', to: 'sessions#destroy'
  get 'register', to: 'users#new'
end
