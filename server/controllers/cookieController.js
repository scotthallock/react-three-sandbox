const cookieController = {};

cookieController.setSSIDCookie = (req, res, next) => {
  const cookieId = res.locals.userId;
  console.log('setSSIDCookie');
  res.cookie('ez3d', 'says hello!');
  res.cookie('ssid', cookieId, { httpOnly: true });
  next();
};

module.exports = cookieController;
