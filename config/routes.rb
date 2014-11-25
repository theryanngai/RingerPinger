Rails.application.routes.draw do
  resources :users do
    resources :profiles, except: :index
  end
  resource :session
  resources :profiles, only: :index
end
