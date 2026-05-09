Rails.application.routes.draw do
  get "up" => "rails/health#show", as: :rails_health_check

  namespace :api do
    namespace :v1 do
      resources :characters, only: [ :index, :show ]
      post "chat/stream", to: "chat#stream"
    end
  end
end
