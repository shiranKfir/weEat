class ZomatoApi
  BASE_URL = '/api/v2.1'.freeze
  NY_CITY_ID = 280

  def initialize
    @headers = { 'user-key' => ::Rails.application.config.zomato_api_key,
                 'Accept' => 'application/json'}
    @conn = Faraday.new(url: 'https://developers.zomato.com', headers: @headers)
  end

  def get_cuisines
    res = zamato_api_call(endpoint: 'cuisines', params: { city_id: NY_CITY_ID })
    return unless res

    icons = ('a'..'z').to_a + ('0'..'9').to_a

    res['cuisines'].each do |c|
      #Cuisine.create({ :name => c['cuisine']['cuisine_name'], :icon => icons.sample })
      cuisine = Cuisine.find_or_initialize_by(id: c['cuisine']['cuisine_id'])
      cuisine.name = c['cuisine']['cuisine_name']
      cuisine.icon ||= icons.sample
      cuisine.save!
    end
  end

  def get_restaurants
    start = 0
    while start < 1000
      res = zamato_api_call(endpoint: 'search',
                            params: { entity_id: NY_CITY_ID,
                                      entity_type: 'city',
                                      start: start })
      return if !res || res['results_shown'].zero?

      cuisines = Cuisine.all.each_with_object({}) { |cuisine, hash| hash[cuisine.name] = cuisine.id }

      res['restaurants'].each do |r|
        restaurant = Restaurant.find_or_initialize_by(id: r['restaurant']['id'])
        restaurant.title = r['restaurant']['name']
        restaurant.address = r['restaurant']['location']['address']
        restaurant.lat = r['restaurant']['location']['latitude']
        restaurant.lng = r['restaurant']['location']['longitude']
        restaurant.max_delivery_time = (0..120).step(5).to_a.sample
        restaurant.has_10bis = [true, false].sample
        restaurant.rating = r['restaurant']['user_rating']['aggregate_rating'].to_f.round
        cuisine = r['restaurant']['cuisines'].split(", ")[0]
        restaurant.cuisine_id = cuisines[cuisine] if cuisines[cuisine]

        restaurant.save!
      end
      start += res['results_shown']
    end
  end

  def get_reviews
    Restaurant.all.each do |restaurant|
      res = zamato_api_call(endpoint: 'reviews', params: { res_id: restaurant.id, count: 5})
      return if !res || res['reviews_shown'].zero?

      res['user_reviews'].each do |r|
        review = Review.find_or_initialize_by(id: r['review']['id'].to_i)
        p "review: #{review}"
        review.reviewer_name = r['review']['user']['name']
        review.comment = r['review']['review_text']
        review.rating = r['review']['rating']
        review.restaurant_id = restaurant.id
        review.save!
      end
    end
  end

  def zamato_api_call(endpoint:, params: {})
    res = @conn.get "#{BASE_URL}/#{endpoint}", params
    res.success? ? JSON.parse(res.body) : {}
  end

end