Rails.application.routes.draw do
	root to: 'root#root'
	
	namespace :api, defaults: { format: :json } do
  	
  	resources :users do
    	resources :profiles, except: :index
    end

    resources :profiles, only: :index
    resource :session
  end
end
