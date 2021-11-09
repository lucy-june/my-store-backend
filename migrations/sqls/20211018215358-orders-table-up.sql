/* Replace with your SQL commands */
CREATE TABLE IF NOT EXISTS orders (
  order_id SERIAL PRIMARY KEY,
  status VARCHAR(64),
  user_id BIGINT REFERENCES users(user_id)
);