import { UserController } from '../controller/User';
import { AuthController } from '../controller/Auth';

import auth from '../middleware/auth';

export class Routes {

  public userController: UserController = new UserController();
  public authController: AuthController = new AuthController();

  public routes(app): void {
    app.route('/user')
      .get(auth, this.userController.list)
      .post(this.userController.create);
    
    app.route('/user/:id')
      .get(this.userController.show)
      .put(this.userController.edit)
      .delete(this.userController.remove);
    
    app.route('/login').post(this.authController.logar);
    app.route('/changepassword').post(auth, this.userController.changePassword);
  }
}