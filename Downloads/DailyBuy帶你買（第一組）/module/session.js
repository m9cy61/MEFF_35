// session設定
var session = require('express-session');

const session_set = session({
     secret: 'lincodadlovewinnie',
     resave: true,
     saveUninitialized: true,
     cookie: {
          path: '/',
          httpOnly: true,
          secure: false,
          maxAge: 60 * 60 * 1000 // 記憶時間
     }
});

module.exports = session_set;