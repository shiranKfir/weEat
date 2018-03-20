class Api::V1::ReviewsController < ApplicationController
  include ErrorConcern

  before_action :set_review, only: [:show, :edit, :update, :destroy]
  skip_before_action :verify_authenticity_token

  # GET /reviews
  def index
    @reviews = Review.all
    render json: @reviews
  end

  # GET /reviews/1
  def show
    render json: @review if @review.present?
  end

  # POST /reviews
  def create
    @review = Review.create!(review_params)
    render json: @review, status: :created
  end

  # PATCH/PUT /reviews/1
  def update
    @review.update!(review_params)
    render json: @review, status: :ok
  end

  # DELETE /reviews/1
  def destroy
    @review.destroy
    head :no_content, status: :ok
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_review
      @review = Review.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def review_params
      params.permit(:reviewer_name, :rating, :comment, :restaurant_id)
    end
end