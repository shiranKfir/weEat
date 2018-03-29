class HomeController < ApplicationController
  def index
    render inline: '', layout: 'application'
  end
end
