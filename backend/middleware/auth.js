const jwt = require('jsonwebtoken'),
    config = require('../config');

module.exports = {
    isAuthenticated: function (req, res, next) {
        const token =
        req.body.token || req.query.token || req.headers["x-access-token"] || req.cookies.token;
    console.log(token)
      if (!token) {
        return res.status(403).send("A token is required for authentication");
      }
      try {
        const decoded = jwt.verify(token, config.TOKEN_KEY);
        req.user = decoded;
      } catch (err) {
        return res.status(401).send("Invalid Token");
      }
      return next();
    },
    getUserData: function (req, res, next) {
        const token =
            req.body.token ||
            req.query.token ||
            req.headers['x-access-token'] ||
            req.cookies.token;
        if (!token) {
            res.status(401).send('Unauthorized: No token provided');
        } else {
            jwt.verify(token, config.JWT_SECRET, function (err, decoded) {
                req.name = decoded.name;
              //  req.username = decoded.username;
                next();
            });
        }
    }
};
