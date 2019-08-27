var express = require('express');
var router = express.Router();
var Stoarge = require("../connections/Storage");
var multer = require('multer');
var upload = multer({storage: Stoarge});
var dbconnect = require('../connections/dataBaseConfig');


/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('addplace');
});
//upload.single('imgUploader')
var cpUpload = upload.fields([{ name: 'imgUploader', maxCount: 1 }, { name: 'gallery', maxCount: 8 }]);
router.post('/post', cpUpload, function (req, res, nex) {

    var today = new Date();
    var file = "";
    var file350 = "";

    if(req.files['imgUploader'] !== undefined){
       var dataOne = JSON.parse(JSON.stringify(req.files['imgUploader']));

        if (dataOne.length > 0){
            file = dataOne[0].filename;
        }else {
            file = "";
        }
    }

    if(req.files['gallery'] !== undefined) {
        var dataTwo = JSON.parse(JSON.stringify(req.files['gallery']));
        if (dataTwo.length > 0) {
            file350 = dataTwo[0].filename;
        } else {
            file350 = "";
        }
    }

    console.log("-------------- ",file,"  ");
    console.log("------file350-------- ",file350,"  ");

    var addPlace = {
        "city": req.body.city,
        "place_name": req.body.place_name,
        "place_desc":req.body.place_desc,
        "place_tovisit":req.body.place_tovisit,
        "place_image_350_400":file350,
        "place_images": file,
        "place_distance": req.body.place_distance,
        "place_duration":req.body.place_duration,
        "created_on":today
    };

    dbconnect.query('INSERT INTO st_places SET ?', addPlace, function (error, results) {
        if (error) {
            console.log(error);
        } else {
            res.redirect('/thankyouPlace')
        }
    })
});

module.exports = router;