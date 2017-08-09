var express = require("express");
var router = express.Router();
module.exports = router;

router.post("/data/signUp", function(req, res) {

    var data = req.body.data;
    console.log("data:" + JSON.stringify(data));

    // if (type != null) {
    //     dataFilter = { "usernamehash": false, "password": false };
    //     var whereFilter = {};
    //     switch (type) {
    //         case "admin":
    //             whereFilter = { "admin": true };
    //             break;
    //         case "active":
    //             whereFilter = { "active": true };
    //             break;
    //         case "deactive":
    //             whereFilter = { "active": false };
    //             break;
    //         case "email":
    //             whereFilter = { "IsEmailVerified": false };
    //             break;
    //     }

    //     db.find("users", dataFilter, whereFilter).then(function(results) {
    //         res.json(results);
    //     });
    //} else
    res.json(false);
});