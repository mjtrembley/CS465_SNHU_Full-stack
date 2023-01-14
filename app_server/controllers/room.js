var fs = require('fs');
var rooms = JSON.parse(fs.readFileSync('./data/rooms.json', 'utf8'));

/* GET travel view */
const room = (req, res) => {
    res.render('room', {title: 'Travlr Getaways', rooms});
};
module.exports = {
    room
};