import dotenv from 'dotenv';
import { Pool } from 'pg';

dotenv.config();

const {
  POSTGRES_HOST,
  POSTGRES_DB,
  POSTGRES_TEST_DB,
  POSTGRES_USER,
  POSTGRES_TEST_USER,
  POSTGRES_PASSWORD,
  ENV
} = process.env;

let Client: Pool;

if (ENV === 'test') {
  Client = new Pool({
    host:POSTGRES_HOST,
    database: POSTGRES_TEST_DB,
    user: POSTGRES_TEST_USER,
    password: POSTGRES_PASSWORD
  })
} else if (ENV === 'dev') {
  Client = new Pool({
    host: POSTGRES_HOST,
    database: POSTGRES_DB,
    user: POSTGRES_USER,
    password: POSTGRES_PASSWORD
  });
} else {
  throw new Error("ENV must be either 'test' or 'dev' to use this module");
}

export default Client;