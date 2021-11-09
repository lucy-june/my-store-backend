/* Replace with your SQL commands */
CREATE TABLE IF NOT EXISTS cart (
  cart_id SERIAL PRIMARY KEY,
  token TEXT NOT NULL,
  createdAt TIMESTAMP NOT NULL,
  user_id BIGINT REFERENCES users(user_id)
);