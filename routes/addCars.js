var express = require('express');
var router = express.Router();
var Stoarge = require("../connections/Storage");
var multer = require('multer');
var upload = multer({storage: Stoarge});
var dbconnect = require('../connections/dataBaseConfig');


/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('addcars', { title: 'Express' });
});


router.post('/post', upload.single('imgUploader'), function (req, res, nex) {

    var today = new Date();

    var file = "";
    if(req.file){
        file = req.file.filename;
    }else {
        file = "";
    }

    var addCars = {
        "make": req.body.make,
        "model":req.body.model,
        "ac_nonac":req.body.ac_nonac,
        "wifi": req.body.wifi,
        "priceperkm": req.body.priceperkm,
        "night_charge":req.body.night_charge,
        "tolls_parking":req.body.tolls_parking,
        "created_on":today,
        "car_image":file
    };

    dbconnect.query('INSERT INTO st_cars SET ?', addCars, function (error, results) {
        if (error) {
            console.log(error);
        } else {
            res.redirect('/thankyouCars')
        }
    })
});

module.exports = router;