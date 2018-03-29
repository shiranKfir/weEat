class ReviewsController < ApplicationController
  before_action :set_review, only: [:show, :edit, :update, :destroy]
  skip_before_action :verify_authenticity_token

  # GET /reviews
  # GET /reviews.json
  def index
    @reviews = Review.all
    render json: @reviews
  end

  # GET /reviews/1
  # GET /reviews/1.json
  def show
    render json: @review if @review.present?
  end

  # POST /reviews
  # POST /reviews.json
  def create
    @review = Review.new(review_params)

    if @review.save
      render json: @review, status: :created
    else
      render json: @review.errors, status: :bad_request
    end
  end

  # PATCH/PUT /reviews/1
  # PATCH/PUT /reviews/1.json
  def update
    if @review.update(review_params)
      render json: @review, status: :ok
    else
      render json: @review.errors, status: :unprocessable_entity
    end
  end

  # DELETE /reviews/1
  # DELETE /reviews/1.json
  def destroy
    if @review.destroy
      head :ok
    else
      render json: @review.errors, status: :unprocessable_entity
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_review
      @review = Review.find(params[:id])
    rescue ActiveRecord::RecordNotFound
      render json: { error: "Review does not exist" }, status: :not_found
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def review_params
      params.permit(:reviewer_name, :rating, :comment, :restaurant_id)
    end
end