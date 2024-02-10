const AuthService = require('server/Controller/Auth_service.js');

const authService = new AuthService();

exports.register = async (req, res, next) => {
  const { username, password } = req.body;
  const result = await authService.register(username, password);
  res.status(result.status).json({ message: result.message, error: result.error });
};

exports.login = async (req, res, next) => {
  const { username, password } = req.body;
  const result = await authService.login(username, password);
  res.status(result.status).json({ message: result.message, user: result.user, error: result.error });
};
