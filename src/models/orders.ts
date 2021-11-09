import Client from "../database";

export type Order = {
  orderId: number,
  status: string,
  userId: number
}


export class Orders {
  async create(o: Order): Promise<Order> {
    try {
      const conn = await Client.connect();
      const sql = 'INSERT INTO orders (order_id, status, user_id) VALUES ($1, $2, $3) RETURNING *';
      const result = await conn.query(sql, [o.orderId, o.status, o.userId]);
      //console.log('*******************' + JSON.stringify(result.rows[0]));
      conn.release();
      return result.rows[0];
    } catch (err) {
      throw new Error(`Could not create order: ${err}`);
    }
  }

  async readAll(): Promise<Order[]> {
    try {
      const conn = await Client.connect();
      const sql = 'SELECT * FROM orders';
      const result = await conn.query(sql);
      //console.log('*******************' + JSON.stringify(result.rows[0]));
      conn.release();
      return result.rows;
    } catch (err) {
      throw new Error(`Could not read all orders from database: ${err}`);
    }
  }

  async readOne(id: number): Promise<Order[]> {
    try {
      const conn = await Client.connect();
      const sql = 'SELECT * FROM orders WHERE order_id = $1';
      const result = await conn.query(sql, [id]);
      const order = result.rows[0];
      conn.release();
      console.log(order);
      return order;
    } catch (err) {
      throw new Error(`Could not find order ${id}.: ${err}`);
    }
  }

  async addProduct(quantity: number, orderId: string, productId: string): Promise<Order> {
    //get order to see if it is active or completed
    // try {
    //   const ordersql = 'SELECT * FROM orders WHERE order_id = $1';
    //   const conn = await Client.connect();
    //   const result = await conn.query(ordersql, [orderId]);
    //   const order = result.rows[0];
    //   if (order.status !== "active") {
    //     throw new Error(`Could not add product ${productId} to order ${orderId} because order status is ${order.status}`);
    //   }
    // } catch (err) {
    //   throw new Error(`${err}`);
    // }

    //add products to the order_products;
    try {
      const sql = 'INSERT INTO order_products (quantity, order_id, product_id) VALUES ($1, $2, $3) RETURNING *';
      const conn = await Client.connect();
      const result = await conn.query(sql, [quantity, orderId, productId]);
      const order = result.rows[0];
      conn.release();
      return order;
    } catch (err) {
      throw new Error(`Could not add product ${productId} to order ${orderId}: ${err}`);
    }
  }
}