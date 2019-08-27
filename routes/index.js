var express = require('express');
var router = express.Router();

var dataThree = [];
var dbconnect = require('../connections/dataBaseConfig');

/* GET home page. */
router.get('/', function(req, res, next) {

    dbconnect.query('SELECT * FROM st_places', function (error, results) {
        if (error) {
            console.log(error);
        } else {

            var data = [];
            var dataTwo = [];

            data = JSON.parse(JSON.stringify(results));
            for (var i=0;i<data.length;i++){
              if (i<=3){
                  dataTwo.push(data[i])
              }

              if(i<=5){
                  dataThree.push(data[i])
              }

            }
            res.render('index', {data:dataTwo});
            console.log("result------------- >>> ",dataTwo.length);
        }
    })



});

module.exports = router;
