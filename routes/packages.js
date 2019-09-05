var express = require('express');
var router = express.Router();
var dbconnect = require('../connections/dataBaseConfig');
var data = [];
/* GET home page. */
router.get('/', function(req, res, next) {
    dbconnect.query('SELECT * FROM st_places', function (error, results) {
        if (error) {
            console.log(error);
        } else {
            var dataTwo = [];
            data = JSON.parse(JSON.stringify(results));
            for (var i=0;i<data.length;i++){
                if (i<=3){
                    dataTwo.push(data[i])
                }
            }
            res.render('packages',{data:data,dataTwo:dataTwo});
           // console.log("result------------- >>> ",data);
        }
    })
});




module.exports = router;