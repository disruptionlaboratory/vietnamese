const permission = (permissionSlug) => (req, res, next) => {
  const { user } = req;
  const { permissions } = user;
  const permission = permissions.find(({ slug }) => slug === permissionSlug);
  if (!permission) {
    res.status(401);
    res.json({ message: "Unauthorised (401)" });
    return;
  }
  next();
};

module.exports = permission;
