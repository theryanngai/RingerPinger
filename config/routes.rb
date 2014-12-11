Rails.application.routes.draw do
	root to: 'root#root'
	
	namespace :api, defaults: { format: :json } do
  	resources :users 
    resource :session
    resources :events
    resources :sports
    resources :usersports, only: [:index, :create, :destroy]
    resources :eventusers
  end
end
 