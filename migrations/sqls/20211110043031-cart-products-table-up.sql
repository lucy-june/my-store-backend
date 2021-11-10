/* Replace with your SQL commands */
CREATE TABLE IF NOT EXISTS cart_products (
  id SERIAL PRIMARY KEY,
  quantity INTEGER,
  cart_id BIGINT REFERENCES cart(cart_id),
  product_id BIGINT REFERENCES products(product_id)
);