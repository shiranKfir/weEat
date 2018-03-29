class CuisinesController < ApplicationController
  before_action :set_cuisine, only: [:show, :edit, :update, :destroy]
  skip_before_action :verify_authenticity_token

  # GET /cuisines
  # GET /cuisines.json
  def index
    @cuisines = Cuisine.all
    render json: @cuisines
  end

  # POST /cuisines
  # POST /cuisines.json

  def create
    @cuisine = Cuisine.new(cuisine_params)

    if @cuisine.save
      render json: @cuisine, status: :created
    else
      render json: @cuisine.errors, status: :bad_request
    end
  end

  # PATCH/PUT /cuisines/1
  # PATCH/PUT /cuisines/1.json

  def update
    if @cuisine.update(cuisine_params)
      render json: @cuisine, status: :ok
    else
      render json: @cuisine.errors, status: :unprocessable_entity
    end
  end

  # DELETE /cuisines/1
  # DELETE /cuisines/1.json
  def destroy
    if @cuisine.destroy
      head :ok
    else
      render json: @cuisine.errors, status: :unprocessable_entity
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_cuisine
      @cuisine = Cuisine.find(params[:id])
    rescue ActiveRecord::RecordNotFound
      render json: { error: "Cuisine does not exist" }, status: :not_found
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def cuisine_params
      params.permit(:name, :icon)
    end
end