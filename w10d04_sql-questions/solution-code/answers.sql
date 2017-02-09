-- 1. Selects the names of all products that are not on sale.

select name from products where on_sale = 'f';

-- 2. Selects the names of all products that cost less than £20.

select name from products where price < 20;

-- 3. Selects the name and price of the most expensive product.

select name, max(price) from products;

or

select name, price from products order by price desc limit 1;

-- 4. Selects the name and price of the second most expensive product.

select name, price from products order by price desc limit 1 offset 1;

select max(price), name from products where price not in (select max(price, name) from products); 

select name, max(price) from products where price < (select max(price) from products);

-- 5. Selects the name and price of the least expensive product.

select name, price from products order by price asc limit 1;

-- 6. Selects the names and prices of all products, ordered by price in descending order.

select name, price from products order by price desc;

-- 7. Selects the average price of all products.
select avg(price) from products;

-- 8. Selects the sum of the price of all products.
select sum(price) from products;

-- 9. Selects the sum of the price of all products whose prices is less than £20.
select sum(price) from products where price < 20;

-- 10. Selects the id of the user with your name.

select id from users where name = 'Gerry Mathe';

-- 11. Selects the names of all users whose names start with the letter "E".
select name from users where name like 'E%';

-- 12. Selects the number of users whose first names are "Benjamin".

select count(id) from users where name like 'Benjamin%';

-- 13. Selects the number of users who want a "Teddy Bear".

SELECT COUNT(*) FROM wishlists inner join products on products.id = wishlists.product_id where products.name = 'Teddy Bear';

or 

select count(u.id) from users u join wishlists w on u.id = w.user_id join products p on w.product_id = p.id where p.name = 'Teddy Bear';


-- 14. Selects the count of items on the wishlish of the user with your name.

select count(w.id) from wishlists w join users u on w.user_id = u.id where u.name = 'Gerry Mathe';

-- 15. Selects the count and name of all products on the wishlist, ordered by count in descending order.
SELECT p.name, count(w.id) FROM wishlists AS w JOIN products AS p ON w.product_id = p.id GROUP BY p.name order by count(w.id) desc;

-- 16. Selects the count and name of all products that are not on sale on the wishlist, ordered by count in descending order.

select p.name, count(w.id) from wishlists w join products p on w.product_id = p.id where p.on_sale ='f' group by p.name order by count(w.id) desc;


-- 17. Inserts a user with the name "Jonathan Anderson" into the users table. 

insert into users (name) values ('Jonathan Anderson');

-- 19. Inserts a wishlist entry for the user with the name "Jonathan Anderson" for the product "The Ruby Programming Language" using sub queries to find the user id and the product id.

insert into wishlists (product_id, user_id) values ((select id from products where name ='The Ruby Programming Language'), (select id from users where name = 'Jonathan Anderson'));


--20. Updates the name of the "Jonathan Anderson" user to be "Jon Anderson".

update users set name = 'Jon Anderson' where name = 'Jonathan Anderson';

-- 21. Deletes the user with the name "Jon Anderson".

delete from users where name = 'Jon Anderson';

-- 22. Deletes the wishlist item for the user you just deleted.

delete from wishlists where user_id = 26;

    or

delete from wishlists where created_at = (select max(created_at) from wishlists);
