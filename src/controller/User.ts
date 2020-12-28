import * as mongoose from 'mongoose';
import { UserProps, UserSchema } from '../models/User';
import { Request, Response } from 'express';
import * as bcrypt from 'bcrypt';

const User = mongoose.model('User', UserSchema);

export class UserController {
  //Create
  public create(req: Request, res: Response) {
    let user = new User(req.body);

    user.save((err, doc) => {
      if (err) {
        res.send(err);
      }

      res.json(doc);
    });
  }

  // list
  public list(req: Request, res: Response) {
    User.find({}, (err, doc) => {
      if (err) {
        res.send(err);
      }

      res.json(doc);
    });
  }

  // get one
  public show(req: Request, res: Response) {
    User.findById(req.params.id, (err, doc) => {
      if (err) {
        res.send(err);
      }

      res.json(doc);
    });
  }

  // edit
  public edit(req: Request, res: Response) {
    const user = req.body;
    delete user.password;
    User.findOneAndUpdate(
      { _id: req.params.id },
      user,
      { new: true },
      (err, doc) => {
      if (err) {
        res.send(err);
      }

      res.json(doc);
    });
  }

  // remove
  public remove(req: Request, res: Response) {
    User.remove({ _id: req.params.id }, (err) => {
      if (err) {
        res.send(err);
      }

      res.json({
        message: 'The user as been removed'
      });
    });
  }

  //change password
  public changePassword(req: Request, res: Response) {
    const { password, changeNewPassword } = req.body;

    User.findById((<any>req).user._id, async (err, user: UserProps) => {
      if (err) {
        res.send(err);
      }

      if (user) {
        const passwordIdValid = await bcrypt.compare(password, user.password);

        if (passwordIdValid) {
          user.password = changeNewPassword;
          user.save();
          res.send(user);
        }

        res.status(401).send({
          message: 'USer not found'
        });
      }

      res.status(401).send({
        message: 'USer not found'
      });
    });
  }
}