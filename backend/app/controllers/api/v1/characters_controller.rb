module Api
  module V1
    class CharactersController < BaseController
      def index
        render json: { characters: Character.all.map { |c| serialize(c) } }
      end

      def show
        character = Character.find(params[:id])
        return render json: { error: "not_found" }, status: :not_found unless character
        render json: { character: serialize(character) }
      end

      private

      def serialize(c)
        c.except(:system_prompt)
      end
    end
  end
end
