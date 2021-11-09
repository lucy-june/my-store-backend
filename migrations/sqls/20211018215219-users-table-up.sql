/* Replace with your SQL commands */
CREATE TABLE IF NOT EXISTS users (
  user_id SERIAL PRIMARY KEY,
  user_name VARCHAR(150) NOT NULL,
  user_email VARCHAR(255) UNIQUE NOT NULL,
  password_digest VARCHAR
);
