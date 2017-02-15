Rails.application.routes.draw do
  scope :api do
    resources :users
    resources :posts
  end
end
