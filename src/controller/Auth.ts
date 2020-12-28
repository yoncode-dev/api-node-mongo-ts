import * as mongoose from 'mongoose';
import { UserProps, UserSchema } from '../models/User';
import { Request, Response } from 'express';
import * as jwt from 'jsonwebtoken';
import * as bcrypt from 'bcrypt';

const User = mongoose.model('User', UserSchema);

export class AuthController {
  // Logar
  public logar(req: Request, res: Response) {
    const { email, password } = req.body;
    User.findOne({ 'email': email }, async (err, user: UserProps) => {
      if (err) {
        res.send(err);
      } else {
        if (user) {
          const passwordIsValid = await bcrypt.compare(password, user.password);
          if (passwordIsValid) {
            const token = jwt.sign({ user }, process.env.SECRET, {
              expiresIn: 3000
            });

            return res.json({ auth: true, token });
          }
          res.status(401).send({
            message: 'User not found, password'
          });
        } else {
          res.status(401).send({
            message: 'User not found, user'
          });
        }
      }
    });

  }  
}