import { Request, Response } from 'express';

import { UserController } from '../controller/User';

export class Routes {

  public userController: UserController = new UserController();

  public routes(app): void {
    app.route('/user')
      .get(this.userController.list)
      .post(this.userController.create);
    
    app.route('/user/:id')
      .get(this.userController.show)
      .put(this.userController.edit)
      .delete(this.userController.remove);
  }
}