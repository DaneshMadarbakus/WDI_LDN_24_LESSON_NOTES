require "minitest/autorun"

require_relative "enumerators"

describe "FakeEnumerable" do
  before{ @list = [3,4,7,13,42] }

  it "supports map" do
    custom_map(@list){ |x| x + 1 }.must_equal([4,5,8,14,43])  
  end

  # it "supports sort_by" do
  #   custom_sort_by(@list){ |x| x.to_s }.must_equal([13, 3, 4, 42, 7])
  # end

  # it "supports select" do
  #   @list.select { |x| x.even? }.must_equal([4,42])
  # end

  # it "supports reduce" do
  #   @list.reduce(:+).must_equal(69)
  #   @list.reduce { |s,e| s + e }.must_equal(69)
  #   @list.reduce(-10) { |s,e| s + e }.must_equal(59)
  # end
end

# describe "FakeEnumerator" do
#   before do
#     @list = SortedList.new

#     @list << 3 << 13 << 42 << 4 << 7
#   end

#   it "supports next" do
#     enum = @list.each

#     enum.next.must_equal(3)
#     enum.next.must_equal(4)
#     enum.next.must_equal(7)
#     enum.next.must_equal(13)
#     enum.next.must_equal(42)

#     assert_raises(StopIteration) { enum.next }
#   end

#   it "supports rewind" do
#     enum = @list.each

#     4.times { enum.next }
#     enum.rewind

#     2.times { enum.next }
#     enum.next.must_equal(7)
#   end

#   it "supports with_index" do
#     enum     = @list.map
#     expected = ["0. 3", "1. 4", "2. 7", "3. 13", "4. 42"]  

#     enum.with_index { |e,i| "#{i}. #{e}" }.must_equal(expected)
#   end
# end