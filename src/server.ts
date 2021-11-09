import express, { Request, Response } from 'express';
import products_routes from './handlers/products';
import users_routes from './handlers/users';
import orders_routes from './handlers/orders';
import dashboard_routes from './handlers/dashboard';
import cors from 'cors';
import carts_routes from './handlers/carts';

const app: express.Application = express();
const address: string = "0.0.0.0:3000";

app.use(express.json());//to replace app.use(bodyparser.json());
app.use(cors());

app.get('/', function (req: Request, res: Response) {
    res.send('Hello World!');
})

products_routes(app);

users_routes(app);

orders_routes(app);

carts_routes(app);

dashboard_routes(app);

app.listen(3000, function () {
    console.log(`starting app on: ${address}`);
})

export default app;