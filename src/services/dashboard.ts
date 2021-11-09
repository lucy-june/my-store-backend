import Client from '../database';
import { Product, Products } from '../models/products';

export type productsInOrder = {
  product_name: string,
  product_price: number,
  product_category: string,
  product_quantities?: number,
  product_img?: string,
  quantity: number,
  order_id: number
}

export type ordersInUser = {
  user_name: string,
  order_id: number,
  status: string
}


export class DashboardQueries {
  //Get all products that have been included in one order that belonging to a specific user.
  async productsInOrder(user_id: bigint, order_id: bigint): Promise<productsInOrder[]>  {
    try {
      const conn = await Client.connect();
      const sql = 'SELECT product_name, product_price, product_category, product_quantities, product_img, quantity FROM products INNER JOIN order_products ON products.product_id = order_products.product_id INNER JOIN orders ON order_products.order_id = orders.order_id WHERE orders.user_id = ($1) and orders.order_id = ($2)';
      const result = await conn.query(sql, [user_id, order_id]);
      conn.release();
      return result.rows;
    } catch (err) {
      throw new Error(`unable get products and orders: ${err}`);
    }
  }

  //Get all products that have been included in current cart that belonging to a specific user.
  async productsInCart(user_id: bigint, cart_id: bigint): Promise<productsInOrder[]>  {
    try {
      const conn = await Client.connect();
      const sql = 'SELECT product_name, product_price, product_category, product_quantities, product_img, quantity FROM products INNER JOIN cart_products ON products.product_id = cart_products.product_id INNER JOIN cart ON cart_products.cart_id = cart.cart_id WHERE cart.user_id = ($1) and cart.cart_id = ($2)';
      const result = await conn.query(sql, [user_id, cart_id]);
      conn.release();
      return result.rows;
    } catch (err) {
      throw new Error(`unable get products and orders: ${err}`);
    }
  }

  //current orders by user:
  async ordersInUser(id: bigint): Promise<ordersInUser[]> {
    try {
      const conn = await Client.connect();
      const sql = `SELECT user_name, order_id, status FROM users INNER JOIN orders ON users.user_id = orders.user_id WHERE users.user_id = $1`;
      const result = await conn.query(sql, [id]);
      conn.release();
      return result.rows;
    } catch (err) {
      throw new Error(`unable get orders and users: ${err}`);
    }
  }

  async productsByCategory(category: string): Promise<Product[]> {
    try {
      const conn = await Client.connect();
      const sql = `SELECT * FROM products WHERE product_category = $1`;
      const result = await conn.query(sql, [category]);
      conn.release();
      return result.rows;
    } catch (err) {
      throw new Error(`unable get products by category: ${err}`);
    }
  }

  async completedOrderByUser(userId: number): Promise<Product[]> {
    try {
      const conn = await Client.connect();
      // const sql = `SELECT product_name, product_price, product_category, product_quantities, product_img, quantity FROM products INNER JOIN order_products ON products.product_id = order_products.product_id INNER JOIN orders ON order_products.order_id = orders.order_id WHERE orders.status = 'completed' and orders.user_id = $1`;
      const sql = `SELECT * FROM orders WHERE status = 'completed' and user_id = $1`;
      const result = await conn.query(sql, [userId]);
      conn.release();
      return result.rows;
    } catch (err) {
      throw new Error(`unable get completed orders: ${err}`);
    }
  }

}
