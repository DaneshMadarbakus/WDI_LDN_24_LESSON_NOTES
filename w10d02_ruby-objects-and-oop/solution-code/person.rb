class Person 
  def talk(words)
    puts "I say, #{words}"
  end
end

bob = Person.new
# puts bob.class

bob.talk("hello")