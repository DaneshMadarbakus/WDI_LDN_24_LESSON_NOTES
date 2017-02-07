# Simple implementation of a Circle class.
# Notes:
# - class should really use Math::PI, but is defined to demo a class constant
# - `@@instance_count` is pointless, but exists to demo a class variable
# - likewise the `instance_count` class method

class Circle

  PI = 3.14
  @@instance_count = 0
  @radius

  attr_accessor :radius

  def initialize(radius)
    @radius = radius
    @@instance_count += 1
  end

  def self.instance_count
    @@instance_count
  end

  def circumference
    2 * PI * @radius
  end

  def area
    PI * @radius * @radius
  end

end

puts "PI:"
puts Circle::PI

coin = Circle.new 3
puts "--- New coin"
puts coin.radius
puts coin.circumference
puts coin.area
puts Circle.instance_count

puts "--- Coin radius changed"
coin.radius = 4
puts coin.radius
puts coin.circumference
puts coin.area
puts Circle.instance_count

plate = Circle.new 23
puts "--- New plate"
puts plate.radius
puts plate.circumference
puts plate.area
puts Circle.instance_count
