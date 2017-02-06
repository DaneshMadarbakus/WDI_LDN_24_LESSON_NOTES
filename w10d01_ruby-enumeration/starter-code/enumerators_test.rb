require "minitest/autorun"

require_relative "enumerators"

describe "FakeEnumerable" do
  before{ @list = [3,4,7,13,42] }

  it "supports map" do
    custom_map(@list){ |x| x + 1 }.must_equal([4,5,8,14,43])  
  end
end