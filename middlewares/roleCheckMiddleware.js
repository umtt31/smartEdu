module.exports = (roles) => {
  return (req, res, next) => {
    const userRole = req.body.role;
    if (roles.include(userRole)) {
      next();
    } else {
      return res.status(401).send('unauthorized');
    }
  };
};
