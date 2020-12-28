import * as jwt from 'jsonwebtoken';
import { UserController } from '../controller/User';
import { AuthController } from '../controller/Auth';

// Middleware
function auth(req, res, next) {
  const token = req.headers.authorization;

  if (!token) {
    res.status(401).json({
      auth: false,
      message: 'No token'
    });
  }

  jwt.verify(
    token.replace('Bearer ', ''),
    process.env.SECRET,
    function (err, decoded) {
      if (err) {
        return res.status(500).json({
          auth: false,
          message: 'This is not good, an error occurred'
        });
      }

      req.user = decoded.user;
      next();
    });
}

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
  }
}