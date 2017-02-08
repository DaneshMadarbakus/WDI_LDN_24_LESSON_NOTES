require_relative "./models/capitalize"

puts "which word you want to capitalize ?"
word = gets.chomp

new_word = Capitalize.cap(word)

puts "the word capitalized is -> #{new_word}"