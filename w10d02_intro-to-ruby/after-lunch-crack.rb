# Pick 5 random numbers and add them to an array
# As for a number
# Check if that number is in the array
# Remove that number from the array
# Check if there are any numbers left
# Ask again...

SELECTED_NUMBERS = []
LOWER_BOUND      = 0
UPPER_BOUND      = 100
HOW_MANY_NUMBERS = 5
playing          = true

def pick_random_number
  rand(LOWER_BOUND..UPPER_BOUND)
end

def pick_selected_numbers
  HOW_MANY_NUMBERS.times { SELECTED_NUMBERS << pick_random_number }
end

def is_number_present?(answer)
  SELECTED_NUMBERS.include? answer
end

# Use our function to push 5 random numbers into an array
pick_selected_numbers

while playing
  # Ask the user a guess
  puts "Choose a number between #{LOWER_BOUND} and #{UPPER_BOUND}:"

  # Record their guess after converting it to an integer
  answer = gets.to_i

  # Check whether the guess is included in the array of numbers
  if is_number_present?(answer)
    puts "You're right"
    playing = false
  else
    puts "You're wrong."
  end
end
