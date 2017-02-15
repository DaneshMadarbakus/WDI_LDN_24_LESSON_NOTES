u1 = User.create!(username: "alex", first_name: "Alex", last_name: "Chin")
u2 = User.create!(username: "mike", first_name: "Mike", last_name: "Hayden")
u3 = User.create!(username: "rane", first_name: "Rane", last_name: "Gowan")

p1 = u1.posts.create!(body: "I bet we could stick angular ontop of this API...")
p2 = u2.posts.create!(body: "This is quite fast to make a quick API!")
p3 = u1.posts.create!(body: "This could be a fun stack for a final project?")
p4 = u3.posts.create!(body: "I like using Rails!")
