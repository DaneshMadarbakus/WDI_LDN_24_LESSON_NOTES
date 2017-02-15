User.destroy_all
Post.destroy_all

u1 = User.create! username: "wants_boyfriend", first_name: "celine", last_name: "brown_hair"
u2 = User.create! username: "pretends_she_doesnt_want_boyfriend", first_name: "gwen", last_name: "trannoy"
u3 = User.create! username: "doesnt_like_tongue_man", first_name: "dora", last_name: "the_explorer"

p1 = u1.posts.create! body: "No time to go out and meet people #wontspeaktoanyoneanywaywhenido"
p2 = u2.posts.create! body: "So busy with work, not interested; went out 6 times last week #workingnotworking"
p3 = u3.posts.create! body: "Erlang is amazing. #whatarewetalkingabout"
