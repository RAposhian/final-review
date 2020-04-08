select *
from cart_items ci
join products2 p on ci.product_id = p.product_id
where ci.cart_id = $1;