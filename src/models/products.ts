import Client from '../database';

export type Product = {
  id?: number,
  name: string,
  price: number,
  category: string,
  quantities?: number,
  img_url?: string
}

export class Products {
  //create new data within database;
  async create(p: Product): Promise<Product> {
    try {
      const conn = await Client.connect();
      const sql = 'INSERT INTO products (product_name, product_price, product_category, product_img) VALUES ($1, $2, $3, $4) RETURNING *';
      const result = await conn.query(sql, [p.name, p.price, p.category, p.img_url]);
      //console.log('*******************' + JSON.stringify(result.rows[0]));
      conn.release();
      return result.rows[0];
    } catch (err) {
      throw new Error(`Could not add products. Error: ${err}`);
    }
  }

  //read all data from database;
  async readAll(): Promise<Product[]> {
    try {
      const conn = await Client.connect();
      const sql = 'SELECT * FROM products';
      const result = await conn.query(sql);
      conn.release();
      // console.log('*****************' + result.rows);
      return result.rows;
    } catch (err) {
      throw new Error(`Could not get products. Error: ${err}`);
    }
  }

  //read one data from database;
  async readOne(id: number): Promise<Product | unknown> {
    try {
      const conn = await Client.connect();
      const sql = 'SELECT * FROM products WHERE product_id = $1';
      const result = await conn.query(sql, [id]);
      const product = result.rows[0];
      conn.release();
      console.log(product);
      return product;
    } catch (err) {
      throw new Error(`Could not find product ${id}. Error: ${err}`);
    }
  }

  //update price of one specific data within database;
  async update(name: string, img_url: string): Promise<Product | unknown> {
      try {
        const conn = await Client.connect();
        const sql = 'UPDATE products SET product_img = $1 WHERE product_name = $2 RETURNING *';
        const result = await conn.query(sql, [img_url, name]);
        conn.release();
        return result.rows[0];
      } catch (err) {
        throw new Error(`Could not update ${name}. Error: ${err}`);
      }
    }

  //delete one specific data within database;
  async delete(id: number): Promise<Product | unknown> {
    try {
      const conn = await Client.connect();
      const sql = 'DELETE FROM products WHERE product_id = $1 RETURNING *';
      const result = await conn.query(sql, [id]);
      //console.log('*******************' + JSON.stringify(result.rows));
      conn.release();
      return result.rows[0];
    } catch (err) {
      throw new Error(`Could not delete product ${id}. Error: ${err}`);
    }
  }
}

