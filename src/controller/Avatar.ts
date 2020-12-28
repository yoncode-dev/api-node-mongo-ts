import { Request, Response } from 'express';

export class AvatarController {
  public up(req: Request, res: Response) {
    res.json(req.file);
  }
}