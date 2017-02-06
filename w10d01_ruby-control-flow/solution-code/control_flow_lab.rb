puts "what is 2 to the 4th power?"
value = gets.chomp.to_i

while value != 2**4
  print "nope... try again"
  value = gets.chomp.to_i
end

puts "yes!"