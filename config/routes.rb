Rails.application.routes.draw do
  resources :cuisines
  resources :reviews
  resources :restaurants
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end


Rails.application.routes.draw do
  namespace :api do
    namespace :v1 do
      resources :cuisines
      resources :reviews
      resources :restaurants
    end
  end
end