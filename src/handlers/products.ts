import express, { Request, Response } from 'express';
import { Product, Products } from '../models/products';
import dotenv from 'dotenv';
import { verifyAuthJWT } from '../services/authenticateJWT';

dotenv.config();

const productWarehouse = new Products();

const create = async (req: Request, res: Response) => {
  try {
    const product: Product = {
      name: req.body.name,
      price: req.body.price,
      category: req.body.category,
      img_url: req.body.img_url
    }
    const newProduct = await productWarehouse.create(product);
    res.json(newProduct);
  } catch (err) {
    // res.status(400);
    // res.json({ err });
    const error = err as Error;
    const errStr = error.toString();
    console.log(errStr);
    res.json(errStr);
  }
}

const readAll = async (_req: Request, res: Response) => {
  try {
    const products = await productWarehouse.readAll();
    res.json(products);
  } catch (err) {
    res.status(400);
    res.json(err);
  }
}

const readOne = async (req: Request, res: Response) => {
  try {
    const id: number = JSON.parse(req.params.id);
    const product = await productWarehouse.readOne(id);
    res.json(product);
  } catch (err) {
    res.status(400);
    res.json(err);
  }
}

const update = async (req: Request, res: Response) => {
  try {
    const name = req.body.name;
    const img_url = req.body.img_url;
    const updated = await productWarehouse.update(name, img_url);
    res.json(updated);
  } catch (err) {
    res.status(400);
    res.json(err);
  }
}

const deleting = async (req: Request, res: Response) => {
  try {
    const id: number = JSON.parse(req.params.id);
    const deleted =  await productWarehouse.delete(id);
    res.json(deleted);
  } catch (err) {
    res.status(400);
    res.json(err);
  }
}

const products_routes = (app: express.Application) => {
  app.post('/products', create);
  app.get('/products', readAll);
  app.get('/products/:id', readOne);
  app.put('/products', update);
  app.delete('/products/:id', verifyAuthJWT, deleting);
}

export default products_routes;