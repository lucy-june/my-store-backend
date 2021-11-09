import express, { Request, Response  }from "express";
import { Cart, Carts } from '../models/carts';
import { verifyAuthJWT } from "../services/authenticateJWT";

const cartWarehouse = new Carts();

const create = async (_req: Request, res: Response) => {
  try {
    const cart: Cart = {
      token: _req.body.token,
      createdAt: new Date(),
      userId: _req.body.userId
    }
    const newCart = await cartWarehouse.create(cart);
    res.json(newCart);
  } catch (err) {
    // res.status(400);
    // res.json({ err });
    const error = err as Error;
    const errStr = error.toString();
    console.log(errStr);
    res.json(errStr);
  }
}

const addProduct = async (_req: Request, res: Response) => {
  const cartId: string = _req.params.id;
  const productId: string = _req.body.productId;
  const quantity: number = parseInt(_req.body.quantity);
  try {
    const addProduct = await cartWarehouse.addProduct(quantity, cartId, productId);
    res.json(addProduct);
  } catch (err) {
    res.status(400);
    res.json(err);
  }
}


const carts_routes = (app: express.Application) => {
  app.post('/carts/:id/products', addProduct);
  app.post('/carts', verifyAuthJWT, create);
}

export default carts_routes;