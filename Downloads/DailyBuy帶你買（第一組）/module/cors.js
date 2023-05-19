var cors = require('cors');

let cors_opt = {
     origin: [
          'http://localhost:5500',
          'http://127.0.0.1:5500',
          'http://localhost:8000',
          'http://127.0.0.1:8000'
     ]

};

module.exports = cors(cors_opt);