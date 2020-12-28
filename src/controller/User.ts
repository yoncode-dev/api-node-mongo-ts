import * as mongoose from 'mongoose';
import { UserSchema } from '../models/User';
import { Request, Response } from 'express';

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
    User.findOneAndUpdate(
      { _id: req.params.id },
      req.body,
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
}