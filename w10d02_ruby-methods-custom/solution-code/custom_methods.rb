# def say_hello
#   "hello"
# end

# puts say_hello

# # Argument error
# def say_hello(name)
#   "hello #{name}"
# end

# user = gets.chomp
# puts say_hello()

# # No Argument error
# def say_hello(name)
#   "hello #{name}"
# end

# user = gets.chomp
# puts say_hello(user)


# # Default Argument value
# def say_hello(name="Alex")
#   "hello #{name}"
# end

# puts say_hello


# # Splat arguments
# def say_hello(*names)
#   puts "hello, #{names.join(', ')}"
# end

# puts say_hello "Alex", "James", "John", "Dave"

# # Splat arguments with no argument provided
# def say_hello(*names)
#   puts "hello, #{names.join(', ')}"
# end

# puts say_hello


# Splat as a sponge
# def mixed_args(a,b,*c)
#   puts "Arguments:"
#   p a,b,c
# end

# mixed_args(1,2,3,4,5,6,7,8)


# Argument order
# def mixed_args(a,b,*c,d)
#   puts "Arguments:"
#   p a,b,c,d
# end

# mixed_args(1,2,3,4,5,6,7,8)


# def a(f,s)
#   f + s
# end

# a(2,3)


# def add(first_number, second_number)
#   first_number + second_number
# end

# add(2, 3)