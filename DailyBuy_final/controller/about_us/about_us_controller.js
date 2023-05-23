
const path = require('path');

const controller = (req, res) => {

     const filePath = path.resolve(__dirname, '..', '..', 'pages', 'about_us.html');
     res.sendFile(filePath);
};

module.exports = controller;