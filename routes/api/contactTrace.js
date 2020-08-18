const router = require("express").Router();
const ContactController = require("../../controllers/contactController");




router.route("/:time/:minutes/:lon/:lat/:lowDate/:highDate/:user")
    .get(ContactController.find)

module.exports = router;