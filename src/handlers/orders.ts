import express, { Request, Response  }from "express";
import { Order, Orders } from '../models/orders';

const orderWarehouse = new Orders();

const create = async (_req: Request, res: Response) => {
  try {
    const order: Order = {
      orderId: _req.body.orderId,
      status: _req.body.status,
      userId: _req.body.userId
    }
    const newOrder = await orderWarehouse.create(order);
    res.json(newOrder);
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
    const allOrders = await orderWarehouse.readAll();
    res.json(allOrders);
  } catch (err) {
    const error = err as Error;
    const errStr = error.toString();
    console.log(errStr);
    res.json(errStr);
  }
}

const readOne = async (_req: Request, res: Response) => {
  try {
    const orderId: number = parseInt(_req.params.id);
    const oneOrder = await orderWarehouse.readOne(orderId);
    res.json(oneOrder);
  } catch (err) {
    res.status(400);
    res.json(err);
  }
}

const addProduct = async (_req: Request, res: Response) => {
  const orderId: string = _req.params.id;
  const productId: string = _req.body.productId;
  const quantity: number = parseInt(_req.body.quantity);
  try {
    const addProduct = await orderWarehouse.addProduct(quantity, orderId, productId);
    res.json(addProduct);
  } catch (err) {
    res.status(400);
    res.json(err);
  }
}


const orders_routes = (app: express.Application) => {
  app.post('/orders/:id/products', addProduct);
  app.post('/orders', create);
  app.get('/orders', readAll);
  app.get('/orders/:id', readOne);
}

export default orders_routes;