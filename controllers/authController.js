import { AuthService } from "../services/authService.js";

export class AuthController {
  constructor() {
    this.authService = new AuthService();
  }

  register = async (req, res, next) => {
    try {
      const { user, token } = await this.authService.register(req.body);
      res.status(201).json({ status: "success", data: { user, token } });
    } catch (error) {
      next(error);
    }
  };

  login = async (req, res, next) => {
    try {
      const { user, token } = await this.authService.login(req.body);
      res.status(200).json({ status: "success", data: { user, token } });
    } catch (error) {
      next(error);
    }
  };
}

