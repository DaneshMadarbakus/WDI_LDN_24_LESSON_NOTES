# puts "hello" if true


# if true 
#   puts "hello" 
# else
#   puts "bye" 
# end


# if true then puts "hello" else puts "bye" end


# if true; puts "hello"; else; puts "bye"; end


# print "Enter an integer: "
# n = gets.to_i
# if n > 0
#   puts "Your number is positive."
# elsif n < 0
#   puts "Your number is negative."
# else
#   puts "Your number is zero."
# end


# print "Enter an integer: "
# n = gets.to_i
# unless n > 10
#   puts "too small..."
# else
#   puts "LARGE number!"
# end


# user_registered = false
# puts "Please signup!" unless user_registered


# puts "Exit the program? (yes or no): "
# answer = gets.chomp

# case answer
# when "yes"
#   puts "Good-bye!"
#   exit 
# when "no"
#   puts "OK, we'll continue"
# else 
#   puts "That's an unknown answer -- assuming you meant 'no'"
# end
# puts "Continuing with the program..."


# n = 1
# while n < 11
#   puts n
#   n = n + 1
# end
# puts "Done!"


# n = 1
# until n > 10
#   puts n
#   n = n + 1
# end


# for i in 1..10
#   puts "The number is #{i}"
# end 

# for i in 1..10 do
#   puts "The number is #{i}"
# end  

# for i in 1..10 { puts "The number is #{i}" }


# for i in 0..5
#   break if i > 2
#   puts "The number is #{i}"
# end

n = 1
while n < 1000
  n = n + 1
  puts n
  next unless n == 10
  break
end

