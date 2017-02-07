class Person

  DEFAULT_NUMBER_OF_LEGS = 2
  @@count = 0

  attr_reader :name
  attr_accessor :age

  def initialize(name)
    @name = name
    @@count += 1
    puts "Number of Legs #{DEFAULT_NUMBER_OF_LEGS}"
  end

  def Person.count
    @@count
  end

  # def set_name(name)
  #   puts "Setting person's name..."
  #   @name = name
  # end

  # def get_name
  #   puts "Returning person's name..."
  #   @name
  # end

  # def name
  #   @name
  # end

  # def age=(age)
  #   @age = age
  # end

  # def age
  #   @age
  # end

end

# # Before initialize
# bob = Person.new
# bob.set_name "Bob"
# puts bob.get_name

# # After initialize
# bob = Person.new "Bob"
# puts bob.get_name

# After refactor
bob = Person.new "Bob"
puts "Person's name is #{bob.name}"
bob.age = 20
puts "#{bob.name}'s age is #{bob.age}"
puts Person.count
Person.new "Dave"
puts Person.count
puts Person::DEFAULT_NUMBER_OF_LEGS
