
const path = require('path');

const controller = (req, res) => {

     const filePath = path.resolve(__dirname, '..', '..', 'pages', 'index.html');
     res.sendFile(filePath);
};

module.exports = controller;