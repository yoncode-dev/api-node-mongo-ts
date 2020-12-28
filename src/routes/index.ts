import { Request, Response } from 'express';

export class Routes {
  public routes(app): void {
    app.route('/user')
      .get((req: Request, res: Response) => {
        res.status(200).send({
          message: 'get request ok',
        });
      }).post((req: Request, res: Response) => {
        res.status(200).send({
          message: 'post',
        });
      });
    
    app.route('/user/:id')
      .get((req: Request, res: Response) => {
        res.status(200).send({
          message: 'get one',
        });
      }).put((req: Request, res: Response) => {
        res.status(200).send({
          message: 'put',
        });
      }).delete((req: Request, res: Response) => {
        res.status(200).send({
          message: 'delete',
        });
      });
  }
}