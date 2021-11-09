import express, { Request, Response } from 'express';
import { User, Users }  from '../models/users';
import jwt, { JwtPayload } from 'jsonwebtoken';
import dotenv from 'dotenv';
import { verifyAuthJWT } from '../services/authenticateJWT';

dotenv.config();

const userWarehouse = new Users();

//create new user: after user create account, user should get the session(jwt) from the server;
const signUp = async (req: Request, res: Response) => {
  try {
    const user: User = {
      name: req.body.name,
      email: req.body.email,
      password: req.body.password
    }
    let newUser: any;
    newUser = await userWarehouse.create(user);
    var token = jwt.sign(
      {id: newUser.user_id, name: newUser.user_name},
      process.env.TOKEN_SECRET as string,
      {expiresIn: 3600}
      );
      res.status(200).json({
        userName: newUser.user_name,
        userId: newUser.user_id,
        idToken: token,
        expiresIn: 3600
      });
  } catch (err) {
    console.log('%%%%%%%%%%%%%%%%%%%' + err);
    //if (err.incluses('duplicate key value'))
    const error = err as Error;
    const errStr = error.toString();
    if (errStr.includes('duplicate key value violates unique constraint "users_user_email_key"')) {
      //res.json('User is existed, please go to sign in!');
      res.redirect('/users/login');
    } else {
      res.status(500);
      res.json(errStr);
    }
  }
}

//after logged in, user should get the session(jwt) from the server.
const logIn = async (req: Request, res: Response) => {
  try {
    const user: User = {
      email: req.body.email,
      password: req.body.password
    }
    const AuthUser = await userWarehouse.authenticate(user.email, user.password);
    if (AuthUser) {
      const token = jwt.sign(
        {id: AuthUser.user_id, name:AuthUser.user_name},
        process.env.TOKEN_SECRET as string,
        {expiresIn: 3600}
        );
      res.status(200).json({
        userName:AuthUser.user_name,
        userId: AuthUser.user_id,
        idToken: token,
        expiresIn: 3600
      });
    } else {
      res.status(403).send('Username or password incorrect');
      // res.status(403).json({
      //   userName:null,
      //   userId: null,
      //   idToken: null,
      //   expiresIn: null
      // });
    }
  } catch (err) {
    // const error = err as Error;
    // const errStr = error.toString();
    // console.log(errStr);
    res.json(err);
  }
}

//get all users' info;
const readAll = async (req: Request, res: Response) => {
  try {
    const verify = jwt.verify(req.body.token, process.env.TOKEN_SECRET as string);
    console.log('%%%%%%%%%%%%%%%%%', verify);
  } catch (err) {
    res.status(401);
    res.json(`Invalid token ${err}`);
    return;
  }

  try {
    const users = await userWarehouse.readAll();
    res.json(users);
  } catch (err) {
    res.status(400);
    res.json(err);
  }
};

//get one user's info
const readOne = async (req: Request, res: Response) => {
  try {
    const id: number = JSON.parse(req.params.id);
    const user = await userWarehouse.readOne(id);
    res.json(user);
  } catch (err) {
    res.status(400);
    res.json(err);
  }
}

//update the account when the user forgot the password;
// const update = async (req: Request, res: Response) => {
//   const user: User = {
//     name: req.body.name,
//     email: req.body.email,
//     password: req.body.password
//   }
//   try {
//     //console.log('req.headers.authorization' + req.headers.authorization);
//     const token = req.body.token;
//     const decode = jwt.verify(token, process.env.TOKEN_SECRET as string);
//     console.log(decode)
//     let id: number | any;
//     if (id != user.id) {
//       throw new Error('User email does not match!');
//     }
//   } catch (err) {
//     res.status(401);
//     res.json(err);
//     return;
//   }

//   try {
//     const updated = await userWarehouse.create(user);
//     res.json(updated);
//   } catch (err) {
//     res.status(400);
//     res.json(err);
//   }
// }

const users_routes = (app: express.Application) => {
  app.post('/users/signup', signUp);
  app.post('/users/login', logIn);
  app.get('/users', verifyAuthJWT, readAll);
  app.get('/users/:id', verifyAuthJWT, readOne);
  //app.post('/users/update', update);
}

export default users_routes;