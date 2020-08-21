const router = require("express").Router();
const GeolocationController = require("../../controllers/GeolocateController");


router.route("/:id")
    .get(GeolocationController.find)
    .post(GeolocationController.create);

router.route("/:id/:lowDate/:highDate")
    .get(GeolocationController.find)
router.route("/marker/:id")  
    .post(GeolocationController.boxProps)
   
module.exports = router;