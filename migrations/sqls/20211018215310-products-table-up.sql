/* Replace with your SQL commands */
CREATE TABLE IF NOT EXISTS products (
  product_id SERIAL PRIMARY KEY,
  product_name VARCHAR(150) UNIQUE NOT NULL,
  product_price NUMERIC(10, 2) NOT NULL,
  product_category VARCHAR(255),
  product_quantities BIGINT,
  product_img VARCHAR(255)
);