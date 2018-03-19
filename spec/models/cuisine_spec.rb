require 'rails_helper'

describe Cuisine, type: :model do
  context 'associations' do
    it { is_expected.to have_many(:restaurants) }
  end

  context 'validations' do
    it { is_expected.to validate_presence_of(:name) }
  end
end