var express = require('express');
var router = express.Router();
var dbconnect = require('../connections/dataBaseConfig');
var tourData2 = [];
/* GET home page. */
router.get('/:id', function (req, res) {
    var tourid = req.params.id;
    ///console.log("id ==============", tourid);
    dbconnect.query("SELECT * FROM `st_places` WHERE id = '" + tourid + "' ", function (error, results) {
        if (error) {
            return res.status(500).send(error);
        } else {
           var  tourData = JSON.parse(JSON.stringify(results));
           tourData2 = [];
            tourData2 = tourData;
            res.render('booking', {tourData: tourData[0]});
           // console.log("resultl--------------", tourData);
        }

    });
});

router.post('/book', function (req, res) {

    var today = new Date();

    var addBookings = {
        "name": req.body.name,
        "email":req.body.email,
        "phone":req.body.phone,
        "date": req.body.date,
        "pickup_address":req.body.pickup_address,
        "kids":req.body.kids,
        "adults":req.body.adults,
        "message":req.body.message,
        "tourid":tourData2[0].id,
        "price":calculatePrcie(tourData2[0].place_distance),
        "created_on":today,
        "updated_on":today,

    };

    console.log(" my values ------ ",addBookings);

    dbconnect.query('INSERT INTO st_bookings SET ?', addBookings, function (error, results) {
        if (error) {
            console.log(error);
        } else {
            res.redirect('/thankyouCars')
        }
    })
});


function calculatePrcie(kms) {
    console.log("------",kms);
    var price = "";
    return price = (kms * 10)
}


module.exports = router;