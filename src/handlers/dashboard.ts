import express, { Request, Response } from 'express';
import { DashboardQueries } from '../services/dashboard';
import { verifyAuthJWT } from '../services/authenticateJWT';

const dashboard = new DashboardQueries();

//get the products of an order that belonging to the user who created the order;
const productsInOrder = async (_req: Request, res: Response) => {
  try {
    const userId = BigInt(_req.params.userId);
    const orderId = BigInt(_req.params.orderId);
    const products = await dashboard.productsInOrder(userId, orderId);
    res.json(products);
  } catch (err) {
    const error = err as Error;
    const errStr = error.toString();
    console.log(errStr);
    res.json(errStr);
  }
}

//get the products of an order that belonging to the user who created the order;
const productsInCart = async (_req: Request, res: Response) => {
  try {
    const userId = BigInt(_req.params.userId);
    const cartId = BigInt(_req.params.cartId);
    const products = await dashboard.productsInCart(userId, cartId);
    console.log("userId: " + userId, "cartId: " + cartId);
    res.json(products);
  } catch (err) {
    const error = err as Error;
    const errStr = error.toString();
    console.log(errStr);
    res.json(errStr);
  }
}

//get current orders by user:
const ordersInUser = async (_req: Request, res: Response) => {
  try {
    //console.log(_req.params.userId)
    const userId = BigInt(_req.params.userId);
    //console.log('_req.params.userId: ' + userId);
    const orders = await dashboard.ordersInUser(userId);
    res.json(orders);
  } catch (err) {
    const error = err as Error;
    const errStr = error.toString();
    console.log(errStr);
    res.json(errStr);
  }
}

const productsByCategory = async (_req: Request, res: Response) => {
  try{
    //console.log('_req.params'+ _req.params);
    const productCategory = _req.params.category;
    //console.log('productCategory' + productCategory);
    const products = await dashboard.productsByCategory(productCategory);
    res.json(products);
  } catch (err) {
    const error = err as Error;
    const errStr = error.toString();
    console.log(errStr);
    res.json(errStr);
  }
}

const completedOrderByUser = async (_req: Request, res: Response) => {
  try {
    const userId = parseInt(_req.params.userId);
    const completedOrders = await dashboard.completedOrderByUser(userId);
    res.json(completedOrders);
  } catch (err) {
    const error = err as Error;
    const errStr = error.toString();
    console.log(errStr);
    res.json(errStr);
  }
}

const dashboard_routes = (app: express.Application) => {
  app.get('/users/:userId/orders/:orderId/products', verifyAuthJWT, productsInOrder);
  app.get('/users/:userId/cart/:cartId/products', verifyAuthJWT, productsInCart);
  app.get('/users/:userId/orders', verifyAuthJWT, ordersInUser);
  app.get('/products-by-category/:category', productsByCategory);
  app.get('/users/compled-orders-by-id/:userId', completedOrderByUser);
}

export default dashboard_routes;