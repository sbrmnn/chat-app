module Api
  module V1
    class ChatController < BaseController
      include ActionController::Live

      # POST /api/v1/chat/stream
      # Body: { character_id: string, messages: [{ role, content }] }
      #
      # Stub implementation. Real LLM streaming will be added in a follow-up
      # using the anthropic gem and Server-Sent Events.
      def stream
        character = Character.find(params[:character_id])
        unless character
          render json: { error: "character_not_found" }, status: :not_found
          return
        end

        response.headers["Content-Type"] = "text/event-stream"
        response.headers["Cache-Control"] = "no-cache"
        response.headers["X-Accel-Buffering"] = "no"

        stub_text = "(streaming endpoint not yet wired — using stub for #{character[:name]})"
        stub_text.split("").each do |ch|
          response.stream.write("data: #{ { type: "chunk", text: ch }.to_json }\n\n")
          sleep 0.01
        end
        response.stream.write("data: #{ { type: "done" }.to_json }\n\n")
      ensure
        response.stream.close
      end
    end
  end
end
