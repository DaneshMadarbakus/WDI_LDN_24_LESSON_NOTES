require 'benchmark'
require_relative 'solution'
require_relative 'super_fast'

# Add methods here:

# def create_string(number)
#   string = ""
#   if (number % 3) == 0 then string << 'Pling' end
#   if (number % 5) == 0 then string << 'Plang' end
#   if (number % 7) == 0 then string << 'Plong' end
#   if string == ""
#     return number
#   else
#     return string
#   end
# end
#
# def alpha_lions
# 	numbers = (1..105).to_a
# 	numbers.each {|n| create_string(n) }
# end

def alpha_lions_v2
  n = 0
  while n < 106
    if (n % 7 == 0 && n % 5 == 0 && n % 3 == 0)
      "PlingPlangPlong"
    elsif (n % 5 == 0 && n % 3 == 0)
      "PlingPlang"
    elsif (n % 7 == 0 && n % 3 == 0)
      "PlingPlong"
    elsif (n % 7 == 0 && n % 5 == 0)
      "PlangPlong"
    elsif (n % 3 == 0)
      "Pling"
    elsif (n % 5 == 0)
      "Plang"
    elsif (n % 7 == 0)
      "Plong"
    else
      n
    end
    n = n + 1
  end
end

def alpha_lions
  string = ""
  (1..105).map do |n|
    if !(n % 3 == 0 || n % 5 == 0 || n % 7 == 0)
      n
    else
      if (n % 3) == 0 then string << 'Pling' end
      if (n % 5) == 0 then string << 'Plang' end
      if (n % 7) == 0 then string << 'Plong' end
      string
    end
  end
end


def cake_walk
	array = (1..105).to_a

	array.each do |number|
	  string = ""
	  if number % 3 == 0
	    string << "Pling"
	  end
	  if number % 5 == 0
	    string << "Plang"
	  end
	  if number % 7 == 0
	    string << "Plong"
	  end
	  if string == ""
	    string << number.to_s
	  end
	  string
	end
end

def new_york_scorpions
	n = 0
	while n < 106
	  if (n % 3 == 0 && n % 5 == 0 && n % 7 == 0)
	    "PlingPlangPlong"
	  elsif (n % 3 == 0 && n % 5 == 0)
	    "PlingPlang"
	  elsif (n % 3 == 0 && n % 7 == 0)
	    "PlingPlong"
	  elsif (n % 5 == 0 && n % 7 == 0)
	    "PlangPlong"
	  elsif (n % 3 == 0)
	    "Pling"
	  elsif (n % 5 == 0)
	    "Plang"
	  elsif (n % 7 == 0)
	    "Plong"
	  else
	    n
	  end
	  n = n + 1
	end
end

def sharon_hudhayfa_ismael_and_ed_are_cool_guys
	1.upto(105) do |i|
		if i % 5 == 0 and i % 3 == 0 and i % 7 == 0
			"PlingPlangPlong"
		elsif i % 5 == 0 and i % 3 == 0
			"PlingPlang"
		elsif i % 7 == 0 and i % 3 == 0
			"PlingPlong"
		elsif i % 7 == 0 and i % 5 == 0
			"PlangPlong"
		elsif i % 3 == 0
			"Pling"
		elsif i % 5 == 0
			"Plang"
		elsif i % 7 == 0
			"Plong"
		else
			i
		end
	end
end

def ghost_guitars
	for i in 1..105
		if i % 3 == 0 && i % 5 == 0 && i % 7 == 0
			"PlingPlangPlong"
		elsif (i % 3 == 0 && i % 5 == 0)
			"PlingPlang"
		elsif (i % 3 == 0 && i % 7 == 0)
			"PlingPlong"
		elsif (i % 5 == 0 && i % 7 == 0)
			"PlangPlong"
		elsif i % 3 == 0
			 "Pling"
		elsif i % 5 == 0
			"Plang"
		elsif i % 7 == 0
			"Plong"
		else
			i
		end
	end
end

def qwerty_coders
	n = (1..105).to_a
	n.each do |n|
		if n % 3 == 0 && n % 5 == 0 && n % 7 == 0
			"PlingPlangPlong"
		elsif n % 3 == 0 && n % 5 == 0
			"PlingPlang"
		elsif n % 3 == 0
			"Pling"
		elsif n % 5 == 0
			"Plang"
		elsif n % 7 == 0
			"Plong"
		else n
		end
	end
end

def team_smashed_it?
	Array(1..105).map  do |n|
		if n % 3 == 0 && n % 5 == 0 && n % 7 == 0
			then n = "PlingPlangPlong"
		elsif n % 3 == 0 && n % 5 == 0
			then n = "PlingPlang"
		elsif n % 3 == 0 && n % 7 == 0
			then n = "PlingPlong"
		elsif n % 5 == 0 && n % 7 == 0
			then n = "PlangPlong"
		elsif n % 3 == 0
			then n = "Pling"
		elsif n % 5 == 0
			then n = "Plang"
		elsif n % 7 == 0
			then n = "Plong"
		else
			n
		end
	end
end

Benchmark.bmbm do |b|

  b.report("Alpha Lions") do
    10000.times do
      alpha_lions
    end
  end

  b.report("Cake walk") do
    10000.times do
      cake_walk
    end
  end

  b.report("New York Scorpions") do
    10000.times do
      new_york_scorpions
    end
  end

  b.report("Sharon, Hudhayfa, Ismael and Ed are cool guys") do
    10000.times do
      sharon_hudhayfa_ismael_and_ed_are_cool_guys
    end
  end

  b.report("Ghost guitars") do
    10000.times do
      ghost_guitars
    end
  end

  b.report("Qwerty Coders") do
    10000.times do
      qwerty_coders
    end
  end

  b.report("Team smashed it?") do
    10000.times do
      team_smashed_it?
    end
  end

  b.report("Normal solution") do
    10000.times do
      do_the_pling_plang
    end
  end

  b.report("Super fast.") do
    10000.times do
      super_fast
    end
  end

end
