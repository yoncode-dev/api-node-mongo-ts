import * as mongoose from 'mongoose';
import { Request, Response } from 'express';
import { UserProps, UserSchema } from '../models/User';

const User = mongoose.model('User', UserSchema);
export class AvatarController {
  public up(req: Request, res: Response) {
    User.findOneAndUpdate(
      { _id: req.params.id },
      { avatar: req.file },
      { new: true },
      (err, user) => {
        if (err) {
          res.send(err);
        }

        res.json(user);
    });
  }
}