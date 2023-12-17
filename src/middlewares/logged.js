export const logged = (req, res, next) => {
  const userLogged = req.cookies.token;

  if (userLogged != null) {
    return res.json({
      message: "Usuario ya loggeado",
    });
  }
  next();
};
