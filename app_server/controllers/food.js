var fs = require('fs');
var foodsToEat = JSON.parse(fs.readFileSync('./data/foods.json', 'utf8'));

/* GET travel view */
const food = (req, res) => {
    res.render('food', {title: 'Travlr Getaways', foodsToEat});
};
module.exports = {
    food
};