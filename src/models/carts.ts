import { exists } from "fs";
import { QueryResult } from "pg";
import Client from "../database";

export type Cart = {
  cartId?: number,
  token: string,
  createdAt: Date,
  userId: number
}


export class Carts {
  async create(c: Cart): Promise<Cart> {
    try {
      const conn = await Client.connect();
      const sql = 'INSERT INTO cart (token, createdat, user_id) VALUES ($1, $2, $3) RETURNING *';
      const result = await conn.query(sql, [c.token, c.createdAt, c.userId]);
      //console.log('*******************' + JSON.stringify(result.rows[0]));
      conn.release();
      return result.rows[0];
    } catch (err) {
      throw new Error(`Could not create cart: ${err}`);
    }
  }

  async addProduct(quantity: number, cartId: string, productId: string): Promise<Cart> {
    try {
      const sql0 = "UPDATE cart_products SET quantity = cart_products.quantity + ($1) WHERE cart_id = $2 AND product_id = $3 RETURNING *;";

      const sql1 = "INSERT INTO cart_products (quantity, cart_id, product_id) SELECT $1, $2, $3 WHERE NOT EXISTS (SELECT 1 FROM cart_products WHERE cart_id = $2 AND product_id = $3) RETURNING *;";

      const conn = await Client.connect();
      let result =  await conn.query(sql0, [quantity, cartId, productId]);
      // console.log(JSON.stringify(result.rows[0]));
      let order = result.rows[0];
      if (result.rows[0]) {
        // const order = result.rows[0];
        conn.release();
        return order;
      } else {
        let result1 = await conn.query(sql1, [quantity, cartId, productId]);
        order = result1.rows[0];
        conn.release();
        return order;
      }
    } catch (err) {
      throw new Error(`Could not add product ${productId} to cart ${cartId}: ${err}`);
    }
  }
}