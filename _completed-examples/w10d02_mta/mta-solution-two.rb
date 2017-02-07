map = {
  "n" => ["Times Square", "34th", "28th", "23rd", "Union Square", "8th"],
  "l" => ["8th", "6th", "Union Square", "3rd", "1st"],
  "6" => ["Grand Central", "33rd", "28th", "23rd", "Union Square", "Astor"]
}

line_one_unanswered = true
station_one_unanswered = true
line_two_unanswered = true
station_two_unanswered = true

while line_one_unanswered
  puts "Which line do you want to get on at? N, L or 6?"
  line_one = gets.chomp.downcase
  line_one_unanswered = false
  if !map.key?(line_one)
    line_one_unanswered = true
    puts "Enter a valid line please"
  end
end

while station_one_unanswered
  puts "Which station are you getting on at? The stations are #{map[line_one][0..-2].join(', ')} or #{map[line_one][-1]}"
  station_one = gets.chomp.downcase
  if map[line_one].map(&:downcase).index(station_one) == nil
    puts "Enter a valid station please"
  else
    station_one_unanswered = false
  end
end

while line_two_unanswered
  puts "Which line do you want to get off at? N, L or 6?"
  line_two = gets.chomp.downcase
  line_two_unanswered = false
  if !map.key?(line_two)
    line_two_unanswered = true
    puts "Enter a valid line please"
  end
end

while station_two_unanswered
  puts "Which station are you getting off at? The stations are #{map[line_two][0..-2].join(', ')} or #{map[line_two][-1]}"
  station_two = gets.chomp.downcase
  if map[line_two].map(&:downcase).index(station_two) == nil
    puts "Enter a valid station please"
  else
    station_two_unanswered = false
  end
end

if line_one == line_two
  answer = (map[line_one].map(&:downcase).index(station_one) - map[line_one].map(&:downcase).index(station_two)).abs
else
  answer = (map[line_one].map(&:downcase).index(station_one) - map[line_one].map(&:downcase).index("union square")).abs + (map[line_two].map(&:downcase).index(station_two) - map[line_two].map(&:downcase).index("union square")).abs
end

puts "You will go through #{answer} stop#{answer == 1 ? '' : 's'}. #{(answer != 0 && station_one != "union square" && station_two != "union square" && line_one != line_two) ? 'Change at Union Square.' : ''}"

exit
