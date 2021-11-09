import Client from '../database';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';

dotenv.config();

const {
  BCRYPT_PASSWORD,
  SALT_ROUNDS
} = process.env;

const pepper = BCRYPT_PASSWORD;
const salt = SALT_ROUNDS;

export type User = {
  id?: number,
  name?: string,
  email: string,
  password: string
}

export class Users {
  //create new user data within database, supply for signup API;
  async create(u: User): Promise<User> {
    try {
      const conn = await Client.connect();
      const sql = 'INSERT INTO users (user_name, user_email, password_digest) VALUES ($1, $2, $3) RETURNING *';
      const hash = bcrypt.hashSync(u.password + pepper, parseInt(salt as string));
      const result = await conn.query(sql, [u.name, u.email, hash]);
      const user = result.rows[0];
      conn.release();
      return user;
    } catch (err) {
      throw new Error(`Could not add users. Error: ${err}`);
    }
  }

  //authenticate a user within database, supply for login API;
  async authenticate(email: string, password: string): Promise<User | any> {
    try {
      const conn = await Client.connect();
      const sql = 'SELECT * FROM users WHERE user_email = ($1)';
      const result = await conn.query(sql, [email]);
      //console.log('**************' + JSON.stringify(result));
      if (result.rows.length) {
        const user = result.rows[0];
        //console.log('%%%%%%%%%%%%%%%' + JSON.stringify(user));
        if (bcrypt.compareSync(password + pepper, user.password_digest)) {
          return user;
        } else {
          throw new Error('Wrong password');
        }
      }
    } catch (err) {
      throw new Error(`Could not authenticate user. Error: ${err}`);
    }
  }

  //read all users from database;
  async readAll(): Promise<User[]> {
    try {
      const conn = await Client.connect();
      const sql = 'SELECT * FROM users';
      const result = await conn.query(sql);
      const resMap = result.rows.map(eachUser => {
        const newUser: any = {};
        newUser.id = eachUser.user_id;
        newUser.name = eachUser.user_name;
        // newUser.email = eachUser.user_email; /* email for update the account if the user forgot the password or username*/
        return newUser;
      })
      conn.release();
      // console.log('*****************' + result.rows);
      return resMap;
    } catch (err) {
      throw new Error(`Could not get users. Error: ${err}`);
    }
  }

  //read one specific user from database;
  async readOne(id: number): Promise<User | unknown> {
    try {
      const conn = await Client.connect();
      const sql = 'SELECT * FROM users WHERE user_id = $1';
      const result = await conn.query(sql, [id]);
      //console.log(JSON.stringify(result.rows[0]));
      const user: any = {};
      user.id = result.rows[0].user_id;
      user.name = result.rows[0].user_name;
      //user.email = result.rows[0].user_email;
      //console.log(JSON.stringify(user));
      conn.release();
      return user;
    } catch (err) {
      throw new Error(`Could not find user ${id}. Error: ${err}`);
    }
  }
}